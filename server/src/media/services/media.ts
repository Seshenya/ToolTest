import { BlobSASPermissions, BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters } from '@azure/storage-blob'
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
    blobServiceClient.generateAccountSasUrl
    const containerName = 'gdsdt4';
    const blobName = media.media;

    if(!blobName) {
        throw new Error('Blob name not found');
    }

    let startDate = new Date();
    let expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);

    let sharedAccessPolicy = {
        startsOn: startDate,
        expiresOn: expiryDate,
        permissions: BlobSASPermissions.parse("r")
    };

    const storageAccountName = "artsync";
    const storageAccountKey = "2cgJp+r7A4BpXJhdJXijS6HbG0+pQy0eq0p9BNUjLmErzbo521XHftObwsP8yHiw1Ob99RA2M3IA+AStv1JGoQ==";
    const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);

    const sasToken = generateBlobSASQueryParameters({
        containerName: containerName,
        blobName: blobName,
        ...sharedAccessPolicy
    }, sharedKeyCredential).toString();

    const blobUrlWithSAS = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

    media.media = blobUrlWithSAS;

    return media;
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

    await blockBlobClient.upload(data, Buffer.byteLength(data));

    newDigitalProduct.media = blobName;

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
