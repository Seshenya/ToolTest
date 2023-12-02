import { getMedia, getAllMedia, createMedia, searchMedia } from '../services'

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

async function fetchSearchedMedia(req: any, res: any) {
    const { category, file_format, query } = req.body // get search parameters
    const mediaSearched = await searchMedia(category, file_format, query)
    res.send(mediaSearched)
}

export { fetchMedia, fetchAllMedia, addMedia, fetchSearchedMedia }
