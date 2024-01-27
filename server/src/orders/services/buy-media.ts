import { DigitalProduct } from '../../media/entities/digital-product'
import { Order } from '../entities'

async function createOrder(buyer_id: number, product_id: number) {
    try {
        const media = await DigitalProduct.findOne({
            where: { product_id },
            relations: ['owner'],
        })

        if (!media) {
            throw 'Media not found'
        }

        media.selling_count += 1;

        await media.save()

        const newOrder = new Order({
            buyer_id,
            product_id,
        })
        const orders = await newOrder.save()
        return orders
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}

export { createOrder }