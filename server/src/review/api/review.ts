import { createProductReview, getProductReviews } from '../services'

async function fetchProductReviews(req: any, res: any) {
    getProductReviews(req.params.productId)
        .then((reviews) => {
            res.send(reviews)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function addProductReviews(req: any, res: any) {
    createProductReview(req.body)
        .then((review) => {
            res.send(review)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

export { fetchProductReviews, addProductReviews }
