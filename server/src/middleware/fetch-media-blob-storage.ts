import {
    StorageSharedKeyCredential,
    BlobSASPermissions,
    generateBlobSASQueryParameters,
} from '@azure/storage-blob'

export async function generateSASUrl(
    containerName: string,
    blobName: string,
    expiry = 60
): Promise<string> {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING

    if (!connectionString) {
        throw new Error('Azure Storage connection string is not defined')
    }

    const startDate = new Date()
    const expiryDate = new Date(startDate)
    expiryDate.setMinutes(startDate.getMinutes() + expiry)

    const sharedAccessPolicy = {
        startsOn: startDate,
        expiresOn: expiryDate,
        permissions: BlobSASPermissions.parse('r'),
    }

    const storageAccountName = 'artsync'
    const storageAccountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY

    if (!storageAccountKey) {
        throw new Error('Azure Storage account key is not defined')
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(
        storageAccountName,
        storageAccountKey
    )

    const sasToken = generateBlobSASQueryParameters(
        {
            containerName,
            blobName: blobName,
            ...sharedAccessPolicy,
        },
        sharedKeyCredential
    ).toString()

    const blobUrlWithSAS = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`

    return blobUrlWithSAS
}
