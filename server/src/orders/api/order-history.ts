import { getOrders } from '../services'

async function fetchOrders(req: any, res: any) {
    getOrders(req.params.id)
        .then((orders) => {
            res.send(orders)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

export { fetchOrders }
