import { DigitalProduct } from '../entities'
import { MediaType } from '../types'

async function getMedia(product_id: number) {
    const media = await DigitalProduct.findOne({
        where: {product_id},
        relations: ['owner'],
    });

    if(!media) {
        throw new Error('Media not found');
    }

    return media;
}

async function createMedia(media: MediaType) {
    const newDigitalProduct = new DigitalProduct(media)
    const createdMedia = await newDigitalProduct.save()
    return createdMedia
}

export { getMedia, createMedia }
