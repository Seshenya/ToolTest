import { DigitalProduct } from '../entities'
import { MediaType } from '../types'

async function getMedia(product_id: number) {
    const media = await DigitalProduct.findOneBy({
        product_id,
    })
    return media
}

async function createMedia(media: MediaType) {
    const newDigitalProduct = new DigitalProduct(media)
    const createdMedia = await newDigitalProduct.save()
    return createdMedia
}

async function alterMedia(media: MediaType) {
    const { product_id, status } = media;

    try {
        const existingMedia = await DigitalProduct.findOneBy({ product_id });

        if(!existingMedia) {
            throw 'Media Not Found'
        }

        // Update only the 'status' column in the existing media
        await DigitalProduct.update(existingMedia.product_id, { status });
        const updatedMedia = await DigitalProduct.findOneBy({ product_id });
        return updatedMedia
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating media:', error)
        throw error
    }
}

export { getMedia, createMedia, alterMedia}
