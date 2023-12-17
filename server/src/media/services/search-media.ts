import { DigitalProduct } from '../entities'
import { generateSASUrl } from '../../middleware/fetch-media-blob-storage'

async function searchMedia(
    page: number,
    size: number,
    category: string,
    media_type: number,
    query: string
) {
    const skip = (page - 1) * size

    try {
        let baseQuery = DigitalProduct.createQueryBuilder('product')
            .where('1 = 1')
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

        if (query) {
            query += '*' // for partial string matching
            baseQuery = baseQuery.andWhere(
                'MATCH(product.title, product.tags) AGAINST(:query IN BOOLEAN MODE)',
                { query }
            )
        }

        const media = await baseQuery.getMany()

        const containerName = 'gdsdt4'

        for (let i = 0; i < media.length; i++) {
            const blobNameMedia = media[i].media
            const blobNamePreview = media[i].previews
            const blobNameThumbnail = media[i].thumbnail

            try {
                const blobUrlWithSAS = await generateSASUrl(
                    containerName,
                    blobNameMedia
                )
                media[i].media = blobUrlWithSAS
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

        const totalCount = media.length
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
