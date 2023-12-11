import { DigitalProduct } from '../entities'

async function searchMedia(
    page: number,
    size: number,
    category: string,
    media_type: number,
    query: string
) {
    const skip = (page - 1) * size;

    try {
        let baseQuery =
            DigitalProduct.createQueryBuilder('product').where('1 = 1')
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

        const [media, totalCount] = await baseQuery.getManyAndCount();
        
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
