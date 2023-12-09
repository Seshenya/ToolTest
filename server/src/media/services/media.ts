import { BlobServiceClient } from '@azure/storage-blob'
import { DigitalProduct } from '../entities'
import { MediaType } from '../types'
import { promises as fsPromises } from 'fs';

interface MediaData {
    fields: any;
    file: any;
}

async function getMedia(product_id: number) {
    const media = await DigitalProduct.findOne({
        where: { product_id },
        relations: ['owner'],
    })

    if (!media) {
        throw new Error('Media not found')
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!connectionString) {
        throw new Error('Azure Storage connection string is not defined');
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = 'gdsdt4';
    const blobName = media.media;

    if(!blobName) {
        throw new Error('Blob name not found');
    }

    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const downloadResponse = await blockBlobClient.download();
        if(!downloadResponse.readableStreamBody) {
            throw new Error('Readable stream body not found');
        }

        const blobData = await streamToBuffer(downloadResponse.readableStreamBody);
        const decodedData = Buffer.from(blobData).toString('base64');

        const buffer = Buffer.from(decodedData, 'base64').toLocaleString();

        return {
            digitalProduct: media,
            // Replace buffer with blobData to get the actual file
            media: buffer,
        };
    } catch (error) {
        throw new Error('Error fetching media from Azure Blob Storage');
    }
}

async function createMedia(media: MediaData) {
    const newDigitalProduct = new DigitalProduct()

    newDigitalProduct.media_type = parseInt(media.fields.media_type, 10)
    newDigitalProduct.size = media.file.size
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

    const blobName = `media_${Date.now()}_${Math.random()}_${newDigitalProduct.title}.${newDigitalProduct.file_format}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const data = await fsPromises.readFile(media.file.path);
    const base64Buffer = Buffer.from(data).toString('base64');

    await blockBlobClient.upload(base64Buffer, Buffer.byteLength(base64Buffer));

    newDigitalProduct.media = blobName;

    const createdMedia = await newDigitalProduct.save()
    return createdMedia
}

async function alterMedia(media: MediaType) {
    const { product_id, status } = media

    try {
        const existingMedia = await DigitalProduct.findOneBy({ product_id })

        if (!existingMedia) {
            throw 'Media Not Found'
        }

        // Update only the 'status' column in the existing media
        await DigitalProduct.update(existingMedia.product_id, { status })
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
