import { User } from '../../user/entities'
import { DigitalProduct } from '../entities'
import { MediaType } from '../types'
import { promises as fsPromises } from 'fs'
import { generateSASUrl } from '../../middleware/fetch-media-blob-storage'
import { storeBlobToBlobStorage } from '../../middleware/store-media-blob-storage'

interface MediaData {
    fields: any
    fileMedia: any
    filePreviews: any
    fileThumbnail: any
}

async function getMedia(product_id: number) {
    const media = await DigitalProduct.findOne({
        where: { product_id },
        relations: ['owner'],
    })

    if (!media) {
        throw new Error('Media not found')
    }

    const containerName = 'gdsdt4'
    const blobNameMedia = media.media
    const blobNamePreview = media.previews
    const blobNameThumbnail = media.thumbnail

    try {
        const blobUrlWithSAS = await generateSASUrl(
            containerName,
            blobNameMedia
        )
        media.media = blobUrlWithSAS
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNameMedia}`)
    }

    try {
        const previews: string[] = []
        for (const preview of blobNamePreview) {
            const blobUrlWithSAS = await generateSASUrl(containerName, preview)
            previews.push(blobUrlWithSAS)
        }
        media.previews = previews
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNamePreview}`)
    }

    try {
        const blobUrlWithSAS = await generateSASUrl(
            containerName,
            blobNameThumbnail
        )
        media.thumbnail = blobUrlWithSAS
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNameThumbnail}`)
    }

    return media
}

async function createMedia(media: MediaData) {
    try {
        const newDigitalProduct = new DigitalProduct()

        newDigitalProduct.media_type = parseInt(media.fields.media_type, 10)
        newDigitalProduct.size = media.fileMedia.size
        newDigitalProduct.date = new Date()
        newDigitalProduct.owner = media.fields.owner
        newDigitalProduct.price = parseInt(media.fields.price, 10)
        newDigitalProduct.status = parseInt(media.fields.status, 10)
        newDigitalProduct.title = media.fields.title
        newDigitalProduct.description = media.fields.description
        newDigitalProduct.tags = media.fields.tags
        newDigitalProduct.file_format = media.fields.file_format
        newDigitalProduct.category = media.fields.category
    
        const containerName = 'gdsdt4'
    
        // Add Media to Azure Blob Storage
        const blobNameMedia = `media_${Date.now()}_${Math.random()}_${
            newDigitalProduct.title
        }.${newDigitalProduct.file_format}`
        const dataMedia = await fsPromises.readFile(media.fileMedia.path)
    
        storeBlobToBlobStorage(containerName, blobNameMedia, dataMedia)
    
        // Add Previews to Azure Blob Storage
        const blobNamePreviews: string[] = []
        for (const preview of media.filePreviews) {
            const blobNamePreview = `preview_${Date.now()}_${Math.random()}_${
                preview.name
            }`
            const dataPreview = await fsPromises.readFile(preview.path)
    
            storeBlobToBlobStorage(containerName, blobNamePreview, dataPreview)
            blobNamePreviews.push(blobNamePreview)
        }
    
        // Add Thumbnail to Azure Blob Storage
        const blobNameThumbnail = `thumbnail_${Date.now()}_${Math.random()}_${
            media.fileThumbnail.name
        }`
        const dataThumbnail = await fsPromises.readFile(media.fileThumbnail.path)
    
        storeBlobToBlobStorage(containerName, blobNameThumbnail, dataThumbnail)
    
        newDigitalProduct.media = blobNameMedia
        newDigitalProduct.previews = blobNamePreviews
        newDigitalProduct.thumbnail = blobNameThumbnail
    
        const createdMedia = await newDigitalProduct.save()
        return createdMedia
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating media:', error)
        throw error
    }   
}

async function alterMedia(
    product_id: number,
    user_id: number,
    media: MediaType
) {
    const { price, status, title, description, tags, category } = media

    try {
        const existingMedia = await DigitalProduct.findOneBy({ product_id })

        if (!existingMedia) {
            throw 'Media Not Found'
        }

        // Build the update object by excluding undefined values
        const updateObject: Record<string, any> = {}
        if (status !== undefined) {
            const user = await User.findOneBy({ user_id })
            if (user?.type !== 2) {
                throw 'Unauthorized'
            }

            updateObject.status = status
        }
        if (price !== undefined) {
            updateObject.price = price
        }
        if (title !== undefined) {
            updateObject.title = title
        }
        if (description !== undefined) {
            updateObject.description = description
        }
        if (tags !== undefined) {
            updateObject.tags = tags
        }
        if (category !== undefined) {
            updateObject.category = category
        }

        // Update the DigitalProduct entity
        await DigitalProduct.createQueryBuilder()
            .update(DigitalProduct)
            .set(updateObject)
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
