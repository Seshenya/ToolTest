import { BlobSASPermissions, BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters } from '@azure/storage-blob'
import { User } from '../../user/entities'
import { DigitalProduct } from '../entities'
import { MediaType } from '../types'
import { promises as fsPromises } from 'fs';
import { generateSASUrl } from '../../middleware/fetch-media-blob-storage';

interface MediaData {
    fields: any;
    fileMedia: any;
    filePreview: any;
    fileThumbnail: any;
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
        const blobUrlWithSAS = await generateSASUrl(containerName, blobNameMedia);
        media.media = blobUrlWithSAS;
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNameMedia}`);
    }

    try {
        const blobUrlWithSAS = await generateSASUrl(containerName, blobNamePreview);
        media.previews = blobUrlWithSAS;
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNamePreview}`);
    }

    try {
        const blobUrlWithSAS = await generateSASUrl(containerName, blobNameThumbnail);
        media.thumbnail = blobUrlWithSAS;
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNameThumbnail}`);
    }

    return media;
}

async function createMedia(media: MediaData) {
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
    newDigitalProduct.previews = media.fields.previews
    newDigitalProduct.thumbnail = media.fields.thumbnail
    newDigitalProduct.category = media.fields.category

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!connectionString) {
        throw new Error('Azure Storage connection string is not defined');
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    const containerName = 'gdsdt4';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Add Media to Azure Blob Storage
    const blobNameMedia = `media_${Date.now()}_${Math.random()}_${newDigitalProduct.title}.${newDigitalProduct.file_format}`;

    const blockBlobClientMedia = containerClient.getBlockBlobClient(blobNameMedia);

    const dataMedia = await fsPromises.readFile(media.fileMedia.path);

    await blockBlobClientMedia.upload(dataMedia, Buffer.byteLength(dataMedia));

    newDigitalProduct.media = blobNameMedia;

    
    // Add Preview to Azure Blob Storage
    const blobNamePreview = `preview_${Date.now()}_${Math.random()}_${media.filePreview.name}`;

    const blockBlobClientPreview = containerClient.getBlockBlobClient(blobNamePreview);

    const dataPreview = await fsPromises.readFile(media.filePreview.path);

    await blockBlobClientPreview.upload(dataPreview, Buffer.byteLength(dataPreview));


    // Add Thumbnail to Azure Blob Storage
    const blobNameThumbnail = `thumbnail_${Date.now()}_${Math.random()}_${media.fileThumbnail.name}`;

    const blockBlobClientThumbnail = containerClient.getBlockBlobClient(blobNameThumbnail);

    const dataThumbnail = await fsPromises.readFile(media.fileThumbnail.path);

    await blockBlobClientThumbnail.upload(dataThumbnail, Buffer.byteLength(dataThumbnail));

    newDigitalProduct.media = blobNameMedia;
    newDigitalProduct.previews = blobNamePreview;
    newDigitalProduct.thumbnail = blobNameThumbnail;

    const createdMedia = await newDigitalProduct.save()
    return createdMedia
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

async function streamToBuffer(readableStream: NodeJS.ReadableStream) {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        readableStream.on('data', (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on('error', reject);
    });
}

export { getMedia, createMedia, alterMedia }
