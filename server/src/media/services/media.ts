import { DigitalProduct } from '../entities'
import { MediaType } from '../types'

async function getMedia(product_id: number) {
    const media = await DigitalProduct.findOne({
        where: { product_id },
        relations: ['owner'],
    })

    if (!media) {
        throw new Error('Media not found')
    }

    return media
}

async function createMedia(media: MediaType) {
    const newDigitalProduct = new DigitalProduct(media)
    const createdMedia = await newDigitalProduct.save()
    return createdMedia
}

async function alterMedia(product_id: number, media: MediaType) {
    const { price, status, title, description, tags, category } = media

    try {
        const existingMedia = await DigitalProduct.findOneBy({ product_id })

        if (!existingMedia) {
            throw 'Media Not Found'
        }

        // Update the DigitalProduct entity
        await DigitalProduct.createQueryBuilder()
            .update(DigitalProduct)
            .set({
                ...(status !== undefined && { status: status }),
                ...(price !== undefined && { price: price }),
                ...(title !== undefined && { title: title }),
                ...(description !== undefined && { description: description }),
                ...(tags !== undefined && { tags: tags }),
                ...(category !== undefined && { category: category }),
            })
            .where('product_id = :product_id', { product_id: product_id })
            .execute()

        const updatedMedia = await DigitalProduct.findOneBy({ product_id })
        return updatedMedia
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating media:', error)
        throw error
    }
}

export { getMedia, createMedia, alterMedia }
