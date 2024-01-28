import express from 'express'
import { addUser, fetchUser, fetchUsers, updateUser } from './user/api'
import {
    addMedia,
    updateMedia,
    fetchMedia,
    fetchSearchedMedia,
    fetchMediaCategories,
    addMediaCategory,
    updateMediaCategory,
    fetchMediaTypes,
    fetchImage,
    checkPattern
} from './media/api'
import { hasToken, refreshToken, logoutUser, loginUser } from './middleware'
import { buyMedia, fetchOrders } from './orders/api'
import { fetchProductReviews, addProductReviews } from './review/api'
import { add3DModel, fetch3DModels } from './media/api/media'

const router = express.Router()

router.post('/login', loginUser)
router.post('/token', refreshToken)
router.delete('/logout', logoutUser)

router.get('/users/:id', hasToken, fetchUser)
router.get('/users', hasToken, fetchUsers)
router.post('/users', addUser)
router.put('/users/:id', hasToken, updateUser)

router.get('/media/:id', hasToken, fetchMedia)
router.get('/media', hasToken, fetchSearchedMedia)
router.post('/media', hasToken, addMedia)
router.put('/media/:id', hasToken, updateMedia)
router.post('/image', hasToken, fetchImage)
router.get('/check-pattern', hasToken, checkPattern)

router.get('/categories', hasToken, fetchMediaCategories)
router.post('/categories', hasToken, addMediaCategory)
router.put('/categories/:id', hasToken, updateMediaCategory)

router.get('/types', hasToken, fetchMediaTypes)

router.post('/buy-media/:buyer_id/:product_id', hasToken, buyMedia)
router.get('/order-history/:id', fetchOrders)

router.get('/reviews/:productId', hasToken, fetchProductReviews)
router.post('/reviews', hasToken, addProductReviews)

router.get('/3d-models', hasToken, fetch3DModels)
router.post('/3d-models', hasToken, add3DModel)

router.get('/', function (req, res) {
    res.send('GDSD Team 4')
})

export default router
