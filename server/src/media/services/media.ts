import { Media } from '../entities'
import { MediaType } from '../types'

async function getMedia(id: number) {
    const media = await Media.findOneBy({
        id,
    })
    return media
}

async function getAllMedia() {
    const allMedia = await Media.find()
    return allMedia
}

async function createMedia(media: MediaType) {
    const newMedia = new Media(media)
    const createdMedia = await newMedia.save()
    return createdMedia
}

export { getMedia, getAllMedia, createMedia }
