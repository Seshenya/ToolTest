import { getProductReviews } from '../services'

async function fetchProductReviews(req: any, res: any) {
    getProductReviews(req.params.productId)
        .then((reviews) => {
            res.send(reviews)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

export { fetchProductReviews }
