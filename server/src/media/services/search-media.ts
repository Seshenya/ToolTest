import { DigitalProduct } from '../entities'
import { generateSASUrl } from '../../middleware/fetch-media-blob-storage'
import { getSearchHistory, updateSearchHistory } from './search-history'

async function searchMedia(
    page: number,
    size: number,
    category: string,
    media_type: number,
    query: string,
    status: number,
    owner_id: number,
    user_id: number
) {
    const skip = (page - 1) * size

    try {
        let baseQuery = DigitalProduct.createQueryBuilder('product')
            .leftJoinAndSelect('product.owner', 'owner')
            .where('1 = 1')
            .where('product.isDeleted = 0')
            .skip(skip)
            .take(size)

        if (category) {
            baseQuery = baseQuery.andWhere('product.category = :category', {
                category,
            })
        }

        if (media_type) {
            baseQuery = baseQuery.andWhere('product.media_type = :media_type', {
                media_type,
            })
        }

        if (status) {
            baseQuery = baseQuery.andWhere('product.status = :status', {
                status,
            })
        }

        if (owner_id) {
            baseQuery = baseQuery.andWhere('product.owner_id = :owner_id', {
                owner_id,
            })
        }

        if (query) {
            updateSearchHistory(user_id, query)
            query += '*' // for partial string matching
            baseQuery = baseQuery.andWhere(
                'MATCH(product.title, product.tags, product.transcribed_text) AGAINST(:query IN BOOLEAN MODE)',
                { query }
            )
        }

        if (!query && !category && !category) {
            let searchHistory = await getSearchHistory(user_id)
            if (searchHistory !== '') {
                searchHistory += '*';

                const matchingProducts = await DigitalProduct
                    .createQueryBuilder('product')
                    .select(['product.product_id'])
                    .where('MATCH(product.title, product.tags, product.transcribed_text) AGAINST(:searchHistory IN BOOLEAN MODE)', { searchHistory })
                    .getMany();

                const matchingProductsIds = matchingProducts.map((product) => product.product_id)

                baseQuery = baseQuery.addSelect("(CASE WHEN product.product_id IN (:...ids) THEN 1 ELSE 2 END)", "customOrder")
                .orderBy("customOrder")
                .setParameter('ids', matchingProductsIds);
            }
        }

        const media = await baseQuery.getMany()
        const totalCount = await baseQuery.getCount();
        const containerName = 'gdsdt4'

        for (let i = 0; i < media.length; i++) {
            const blobNameMedia = media[i].media
            const blobNamePreview = media[i].previews
            const blobNameThumbnail = media[i].thumbnail

            try {
                const medias: string[] = []
                for (const media of blobNameMedia) {
                    const blobUrlWithSAS = await generateSASUrl(
                        containerName,
                        media
                    )
                    medias.push(blobUrlWithSAS)
                }
                media[i].media = medias
            } catch (error) {
                throw new Error(`Error generating SAS URL for ${blobNameMedia}`)
            }

            try {
                if (blobNamePreview) {
                    const previews: string[] = []
                    for (const preview of blobNamePreview) {
                        const blobUrlWithSAS = await generateSASUrl(
                            containerName,
                            preview
                        )
                        previews.push(blobUrlWithSAS)
                    }
                    media[i].previews = previews
                } else {
                    media[i].previews = []
                }
            } catch (error) {
                throw new Error(
                    `Error generating SAS URL for ${blobNamePreview}`
                )
            }

            try {
                if (blobNameThumbnail) {
                    const blobUrlWithSAS = await generateSASUrl(
                        containerName,
                        blobNameThumbnail
                    )
                    media[i].thumbnail = blobUrlWithSAS
                } else {
                    media[i].thumbnail = ''
                }
            } catch (error) {
                throw new Error(
                    `Error generating SAS URL for ${blobNameThumbnail}`
                )
            }
        }

        return {
            media,
            totalCount,
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error searching media:', error)
        throw error
    }
}

export { searchMedia }
