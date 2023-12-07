import { getMedia, createMedia, alterMedia, searchMedia } from '../services'

async function fetchMedia(req: any, res: any) {
    const media = await getMedia(req.id)
    res.send(media)
}

async function addMedia(req: any, res: any) {
    const media = await createMedia(req.body)
    res.send(media)
}

async function updateMedia(req: any, res: any) {
    alterMedia(req.body)
        .then((media) => {
            res.send(media)
        })
        .catch((error) => {
            res.status(400).send({ message: error })
        })
}

async function fetchSearchedMedia(req: any, res: any) {
    const { category, media_type, query } = req.query // get search parameters
    searchMedia(category, media_type, query)
        .then(({ media, totalCount }) => {
            res.send({ media, totalCount })
        })
        .catch((error) => {
            res.status(400).send({ message: error.message })
        })
}

export { fetchMedia, addMedia, updateMedia, fetchSearchedMedia }
