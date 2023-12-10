import express from 'express'
import { addUser, fetchUser, fetchUsers } from './user/api'
import {
    addMedia,
    updateMedia,
    fetchMedia,
    fetchSearchedMedia,
} from './media/api'
import { hasToken, refreshToken, logoutUser, loginUser } from './middleware'

const router = express.Router()

router.post('/login', loginUser)
router.post('/token', refreshToken)
router.delete('/logout', logoutUser)

router.get('/users/:id', hasToken, fetchUser)
router.get('/users', hasToken, fetchUsers)
router.post('/users', addUser)

router.get('/media/:id', hasToken, fetchMedia)
router.get('/media', hasToken, fetchSearchedMedia)
router.post('/media', hasToken, addMedia)
router.put('/media/:id', hasToken, updateMedia)

router.get('/', function (req, res) {
    res.send('GDSD Team 4')
})

export default router
