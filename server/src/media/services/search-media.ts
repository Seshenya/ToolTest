import { DigitalProduct } from '../entities'

async function searchMedia(
    category: string,
    media_type: number,
    query: string
) {
    try {
        let baseQuery = DigitalProduct.createQueryBuilder(
            'product'
        ).leftJoinAndSelect('product.owner', 'owner')

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
