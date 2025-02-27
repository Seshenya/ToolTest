import { BlobServiceClient } from '@azure/storage-blob'

export async function storeBlobToBlobStorage(
    containerName: string,
    blobName: string,
    blob: Buffer
): Promise<void> {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING

    if (!connectionString) {
        throw new Error('Azure Storage connection string is not defined')
    }

    const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString)
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    await blockBlobClient.upload(blob, Buffer.byteLength(blob))
}

export function generateBlobName(prefix: string, mediaFile: any) {
    const mediaName = mediaFile.name
    const date = Date.now()
    const randomNumber = Math.random()
    return `${prefix}_${date}_${randomNumber}_${mediaName}`
}
