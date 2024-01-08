import { createOrder } from '../services/buy-media'

async function buyMedia(req: any, res: any) {
    createOrder(req.params.buyer_id, req.params.product_id)
        .then((orders) => {
            res.send(orders)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

export { buyMedia }
