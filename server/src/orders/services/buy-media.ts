import { Order } from '../entities'

async function createOrder(buyer_id: number, product_id: number) {
    try {
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
