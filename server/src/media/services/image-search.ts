import { promises as fsPromises } from 'fs'
import { storeBlobToBlobStorage } from '../../middleware/store-media-blob-storage'
import { generateSASUrl } from '../../middleware/fetch-media-blob-storage'

import { grpc } from 'clarifai-nodejs-grpc';
import { V2Client } from 'clarifai-nodejs-grpc/proto/clarifai/api/service_grpc_pb';
import { PostModelOutputsRequest } from 'clarifai-nodejs-grpc/proto/clarifai/api/service_pb';
import { Data, Input, UserAppIDSet, Image } from 'clarifai-nodejs-grpc/proto/clarifai/api/resources_pb';

export async function searchImage(
  media: any
): Promise<{ query: string }> {

  const { file_format } = media.fields
  const containerName = 'gdsdt4'

  if (media.fileMedia !== undefined) {

    const blobNameMedia = `media_${Date.now()}_${Math.random()}.${file_format}`
    const dataMedia = await fsPromises.readFile(media.fileMedia.path)

    // Seshenya: If the main function 'searchImage' terminates before this is completed, since there is no 'await' here, 
    //it might lead to undesired outcomes. It is better to have 'await' before 'storeBlobToBlobStorage' function
    storeBlobToBlobStorage(containerName, blobNameMedia, dataMedia)

    try {
        const blobUrlWithSAS = await generateSASUrl(containerName, blobNameMedia)

        // Set up parameters for Clarifai API request
        const metadata = new grpc.Metadata();
        //Seshenya : Can we move this PAT value to .env file ?
        const PAT = 'dba92bdd6546425fb3ae71d859093119';
        const request = new PostModelOutputsRequest();
        const clarifai = new V2Client("api.clarifai.com", grpc.ChannelCredentials.createSsl());

        // Set authorization header with API key
        metadata.set('authorization', 'Key ' + PAT);

        // Configure Clarifai API request with necessary parameters
       // Seshenya: Can we move this userId to .env file?
        request.setUserAppId(new UserAppIDSet().setUserId("gu01vh22m3xp").setAppId("gdsd4"))
        request.setModelId("general-image-recognition");
        request.addInputs(
          new Input()
            .setData(
              new Data()
                .setImage(
                  new Image()
                    .setUrl(blobUrlWithSAS)
              )
            )
        )

        return new Promise((resolve, reject) => {clarifai.postModelOutputs(
          request,
          metadata,
          async (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return reject(err);
            }
              
            // Extract concepts from the Clarifai API response
            const output = response.getOutputsList()[0];
            const concepts = output.getData()?.getConceptsList();
        
            if (!concepts || concepts.length === 0) {
              return reject("Image Recognition Failed");
            }
        
            const result = []
            for (const concept of concepts) {
              console.log(concept.getName() + ' ' + concept.getValue())
              result.push(concept.getName());
            }
        
            const query = result.join(', ')
            console.log('query', query)
        
            return resolve({query});
            
          }
        );})
    } catch (error) {
        throw new Error(`Error generating SAS URL for ${blobNameMedia}`)
    }

  } else {
    throw new Error("Error Uploading Image")
  }

}


