import { DigitalProduct } from '../entities'
import { promises as fsPromises } from 'fs'
import { generateSASUrl } from '../../middleware/fetch-media-blob-storage'
import { generateBlobName, storeBlobToBlobStorage } from '../../middleware/store-media-blob-storage'
import { transcribeAudio } from './transcribe-audio'
import { spawn } from 'child_process';

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
        const medias: string[] = []
        for (const media of blobNameMedia) {
            const blobUrlWithSAS = await generateSASUrl(containerName, media)
            medias.push(blobUrlWithSAS)
        }
        media.media = medias
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


    const blobNameUserProfile = media?.owner?.profile_picture
    if (blobNameUserProfile) {
        try {
            const blobUrlWithSAS = await generateSASUrl(
                containerName,
                blobNameUserProfile
            )
            media.owner.profile_picture = blobUrlWithSAS
        } catch (error) {
            throw new Error(`Error generating SAS URL for ${blobNameUserProfile}`)
        }
    }

    return media
}

async function createMedia(media: MediaData) {
    try {
        const newDigitalProduct = new DigitalProduct()

        newDigitalProduct.media_type = parseInt(media.fields.media_type, 10)
        let mediaSizeNumber = 0
        if (media.fileMedia && typeof media.fileMedia[Symbol.iterator] === 'function') {
            for (const mediaSize of media.fileMedia) {
                mediaSizeNumber += mediaSize.size
            }
            newDigitalProduct.size = mediaSizeNumber
        } else {
            newDigitalProduct.size = media.fileMedia.size
        }
        newDigitalProduct.date = new Date()
        newDigitalProduct.owner = media.fields.owner
        newDigitalProduct.price = parseInt(media.fields.price, 10)
        newDigitalProduct.status = parseInt(media.fields.status, 10)
        newDigitalProduct.title = media.fields.title
        newDigitalProduct.description = media.fields.description
        newDigitalProduct.tags = media.fields.tags
        newDigitalProduct.file_format = media.fields.file_format
        newDigitalProduct.category = parseInt(media.fields.category, 10)

        const containerName = 'gdsdt4'

        // Gihan: Better to create helper function generate blob name since it is used more than twice.
        // Jonas: I agree. I've created a helper function called generateBlobName() in the store-media-blob-storage.ts file. 
        // I also replaced all accurences of the blob name generation with this helper function.

        // Add Medias to Azure Blob Storage

        const blobNameMedias: string[] = []
        if (media.fileMedia && typeof media.fileMedia[Symbol.iterator] === 'function') {
            for (const mediaFile of media.fileMedia) {
                const blobNameMedia = generateBlobName('media', mediaFile)
                const dataMedia = await fsPromises.readFile(mediaFile.path)

                storeBlobToBlobStorage(containerName, blobNameMedia, dataMedia)
                blobNameMedias.push(blobNameMedia)
            }
        } else {
            const blobNameMedia = generateBlobName('media', media.fileMedia)
            const dataMedia = await fsPromises.readFile(media.fileMedia.path)

            storeBlobToBlobStorage(containerName, blobNameMedia, dataMedia)
            blobNameMedias.push(blobNameMedia)
        }

        // Add Previews to Azure Blob Storage
        const blobNamePreviews: string[] = []
        for (const preview of media.filePreviews) {
            const blobNamePreview = generateBlobName('preview', preview)
            const dataPreview = await fsPromises.readFile(preview.path)

            storeBlobToBlobStorage(containerName, blobNamePreview, dataPreview)
            blobNamePreviews.push(blobNamePreview)
        }

        // Add Thumbnail to Azure Blob Storage
        const blobNameThumbnail = generateBlobName('thumbnail', media.fileThumbnail)
        const dataThumbnail = await fsPromises.readFile(
            media.fileThumbnail.path
        )

        storeBlobToBlobStorage(containerName, blobNameThumbnail, dataThumbnail)

        // Jonas: Do we need some error handling if the transcribeAudio fails?
        // Seshenya: In my opinion, error of transcribeAudio failing is handled in transcribe-audio.ts.
        // And corresponding error is thrown media.ts line 163.
        // Eventually it is caught from the API layer media/api/media.ts line 42.
        // I don't think it is mandatory to handle it here. What do you think? @choan312
        // Jonas: Ah yes you are right. This looks good
        var transcribedTexts: string | null = null
        for (const mediaFile of blobNameMedias) {
            //filter out audios
            if (newDigitalProduct.media_type === 5) {
                const transcribedText = await transcribeAudio(mediaFile)
                if(transcribedText != ""){
                    if( transcribedTexts == null ){
                        transcribedTexts = transcribedText;
                    } else {
                        transcribedTexts += transcribedText;
                    }
                }
            }
        }

        newDigitalProduct.media = blobNameMedias
        newDigitalProduct.previews = blobNamePreviews
        newDigitalProduct.thumbnail = blobNameThumbnail
        if (transcribedTexts != null){
            newDigitalProduct.transcribed_text = transcribedTexts
        }
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
    media: any
) {
    const {
        price,
        status,
        title,
        description,
        tags,
        category,
        media_type,
        file_format,
        comment,
        isDeleted
    } = media.fields
    const containerName = 'gdsdt4'

    try {
        const existingMedia = await DigitalProduct.findOneBy({ product_id })

        if (!existingMedia) {
            throw 'Media Not Found'
        }

        // Build the update object by excluding undefined values
        const updateObject: Record<string, any> = {}
        if (status !== undefined) {

            updateObject.status = status
        }

        if (comment) {
            updateObject.comment = comment
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
        if (media_type !== undefined) {
            updateObject.media_type = media_type
        }
        if (file_format !== undefined) {
            updateObject.file_format = file_format
        }
        if (isDeleted !== undefined) {
            updateObject.isDeleted = isDeleted
        }
        if (media.fileMedia !== undefined) {
            // Add Media to Azure Blob Storage
            // Jonas: I didn't change this part since here we use another way to generate blob name (e.g. with file_format)
            const blobNameMedia = `media_${Date.now()}_${Math.random()}_${title}.${file_format}`
            const dataMedia = await fsPromises.readFile(media.fileMedia.path)

            storeBlobToBlobStorage(containerName, blobNameMedia, dataMedia)

            const transcribedText = await transcribeAudio(blobNameMedia)
            updateObject.media = blobNameMedia
            updateObject.transcribed_text = transcribedText

        }
        if (media.filePreviews !== undefined) {
            // Add Previews to Azure Blob Storage
            const blobNamePreviews: string[] = []
            for (const preview of media.filePreviews) {
                const blobNamePreview = generateBlobName('preview', preview)
                const dataPreview = await fsPromises.readFile(preview.path)

                storeBlobToBlobStorage(
                    containerName,
                    blobNamePreview,
                    dataPreview
                )
                blobNamePreviews.push(blobNamePreview)
            }

            updateObject.previews = blobNamePreviews
        }
        if (media.fileThumbnail !== undefined) {
            // Add Thumbnail to Azure Blob Storage
            const blobNameThumbnail = generateBlobName('thumbnail', media.fileThumbnail)
            const dataThumbnail = await fsPromises.readFile(
                media.fileThumbnail.path
            )

            storeBlobToBlobStorage(
                containerName,
                blobNameThumbnail,
                dataThumbnail
            )

            updateObject.thumbnail = blobNameThumbnail
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


async function predictPattern(url: string) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['src/media/services/predict.py', url]);
        let output = 0;

        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString())
            output += (data.toString().includes('True') ? 1 : 0);
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script process exited with code ${code}`);
                reject(`Python script process exited with code ${code}`);
            } else {
                resolve(output);
            }
        });
    });
}

export { getMedia, createMedia, alterMedia, predictPattern }
