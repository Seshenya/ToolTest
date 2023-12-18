import { MediaType } from '../entities'

async function getMediaTypes() {
    try {
        const mediaTypes: Array<MediaType> = await MediaType.find();
        return mediaTypes;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error :', error)
        throw error
    }
}


export { getMediaTypes }