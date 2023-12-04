import express from 'express'
import { addUser, fetchUser, fetchUsers } from './user/api'
import { addMedia, fetchMedia, fetchSearchedMedia } from './media/api'

const router = express.Router()

router.get('/users/:id', fetchUser)
router.get('/users', fetchUsers)
router.post('/users', addUser)

router.get('/media/:id', fetchMedia)
router.get('/media', fetchSearchedMedia)
router.post('/media', addMedia)

router.get('/', function (req, res) {
    res.send('GDSD Team 4')
})

export default router
