import { AssemblyAI, CreateTranscriptOptions, TranscriptParams } from "assemblyai";
import { generateSASUrl } from "../../middleware/fetch-media-blob-storage";

async function transcribeAudio(mediaFile: string): Promise<string> {
    const containerName = 'gdsdt4'

    const client = new AssemblyAI({
        apiKey : process.env.ASSEMBLYAI_API_KEY as string
    });

    try {
        // Jonas: Two different ways of throwing an error are used here. Decide on one common way.
        // throw String
        // OR
        // throw Error(String) (see below)
        // Seshenya: will update this with the second method.
        if (!mediaFile){
            throw new Error("Req body incomplete")
        }
    
        const audio = await generateSASUrl(containerName, mediaFile)
            
        const params = {
            audio,
        };

        // Jonas: Do we need this dead code? Since the options are not set I believe we don't need the Options
        // Seshenya: yes, I'll remove this. It won't be neccesary.

        const transcript = await client.transcripts.transcribe(params);
        if (transcript && transcript.text != undefined && transcript.text != null) {
            return transcript.text;
        } else {
            throw new Error("Transcription failed or returned null/undefined text.");
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { transcribeAudio };
