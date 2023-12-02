import { DigitalProduct } from '../entities'

async function searchMedia(
    category: string,
    file_format: string,
    query: string
) {
    try {
        let baseQuery =
            DigitalProduct.createQueryBuilder('product').where('1 = 1')

        if (category !== '') {
            baseQuery = baseQuery.andWhere('product.category = :category', {
                category,
            })
        }

        if (file_format !== '') {
            baseQuery = baseQuery.andWhere(
                'product.file_format = :file_format',
                { file_format }
            )
        }

        if (query !== '') {
            query += '*' // for partial string matching
            baseQuery = baseQuery.andWhere(
                'MATCH(product.title, product.tags) AGAINST(:query IN BOOLEAN MODE)',
                { query }
            )
        }
        const media = await baseQuery.getMany()

        return media
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error searching media:', error)
        throw error
    }
}

export { searchMedia }
