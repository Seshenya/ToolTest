import { BlobSASPermissions, BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters } from '@azure/storage-blob'
import { User } from '../../user/entities'
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
    const storageAccountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

    if(!storageAccountKey) {
        throw new Error('Azure Storage account key is not defined');
    }

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
    try {
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
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error :', error)
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
