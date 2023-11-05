import { getMedia, getAllMedia, createMedia } from '../services'

async function fetchMedia(req: any, res: any) {
    const media = await getMedia(req.id)
    res.send(media)
}

async function fetchAllMedia(req: any, res: any) {
    const allMedia = await getAllMedia()
    res.send(allMedia)
}

async function addMedia(req: any, res: any) {
    const media = await createMedia(req.body)
    res.send(media)
}

export { fetchMedia, fetchAllMedia, addMedia }
