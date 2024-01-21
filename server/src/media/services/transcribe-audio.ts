import { AssemblyAI, CreateTranscriptOptions, TranscriptParams } from "assemblyai";
import { generateSASUrl } from "../../middleware/fetch-media-blob-storage";

async function transcribeAudio(mediaFile: string): Promise<string> {
    const containerName = 'gdsdt4'

    const client = new AssemblyAI({
        apiKey : process.env.ASSEMBLYAI_API_KEY as string
    });

    try {
        if (!mediaFile){
            throw new Error("Req body incomplete")
        }
    
        const audio = await generateSASUrl(containerName, mediaFile)
            
        const params = {
            audio,
        };


        const transcript = await client.transcripts.transcribe(params);
        
        if (transcript && transcript.text) {
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
