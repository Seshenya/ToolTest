import express from 'express'
import { addUser, fetchUser, fetchUsers, loginUser } from './user/api'
import { addMedia, fetchMedia, fetchSearchedMedia } from './media/api'
import hasToken from './util/has-token'

const router = express.Router()

router.get('/users/:id', hasToken, fetchUser)
router.get('/users', hasToken, fetchUsers)
router.get('/login', loginUser)
router.post('/users', addUser)

router.get('/media/:id', hasToken, fetchMedia)
router.get('/media', hasToken, fetchSearchedMedia)
router.post('/media', hasToken, addMedia)

router.get('/', function (req, res) {
    res.send('GDSD Team 4')
})

export default router
