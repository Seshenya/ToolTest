import { Order } from '../entities'

async function getOrders(buyer_id: number) {
    try {
        const orders = await Order.find({
            where: { buyer_id },
            relations: ['product'],
            order: {
                order_date: 'DESC',
            },
        })
        return orders
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}

export { getOrders }
