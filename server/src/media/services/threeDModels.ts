import { generateSASUrl } from '../../middleware/fetch-media-blob-storage';
import { storeBlobToBlobStorage } from '../../middleware/store-media-blob-storage';
import { ThreeDModel } from '../entities'
import { promises as fsPromises } from 'fs'

async function get3DModels() {
    try {
        let baseQuery = ThreeDModel.createQueryBuilder('three_d_models')
        const models = await baseQuery.getMany()
        const totalCount = await baseQuery.getCount();
        return {
            models,
            totalCount,
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error :', error)
        throw error
    }
}

async function create3DModel(model: any) {
    try {

        const containerName = 'gdsdt4'

        // Add Media to Azure Blob Storage
        const dataMedia = await fsPromises.readFile(
            model.file.path
        )

        await storeBlobToBlobStorage(containerName, model.file.name, dataMedia)

        try {
            const blobUrlWithSAS = await generateSASUrl(
                containerName,
                model.file.name,
                500000
            )
            // model.url = blobUrlWithSAS
            const createdModel = await new ThreeDModel({
                name: model.fields.name,
                url: blobUrlWithSAS
            }).save()
            return createdModel
        } catch (error) {
            throw new Error(`Error generating SAS URL for ${model.file.name}`)
        }


    } catch (err: any) {
        if (err.code == 'ER_DUP_ENTRY') {
            // eslint-disable-next-line no-console
            console.log('Error :', err)
            throw 'Duplicate entry for category'
        }
        // eslint-disable-next-line no-console
        console.log('Error :', err)
        throw err
    }
}


export { get3DModels, create3DModel }