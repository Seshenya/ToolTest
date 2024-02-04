import fetch from 'node-fetch';
import { Not, IsNull } from 'typeorm';
import { DigitalProduct } from '../entities';
import { getMedia } from './media';

async function similaritySearchFromAudio(query:string): Promise<any> {
    
    const searchAudioEndpoint = 'http://74.235.158.62:8000/search_audio';

    try {
      const allMedia = await DigitalProduct.find({
        select: ["product_id", "transcribed_text"],
        where: {
          transcribed_text: Not(IsNull()),
        },
      });

      const searchData = {
        search_term: query,
        audio_transcriptions: allMedia.map(item => ({ product_id: item.product_id, transcribed_text: item.transcribed_text })),
      };
      const response = await fetch(searchAudioEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchData }),
      });

      const searchResults = await response.json();

      if (searchResults?.results) {
        try {
            const mediaArray = await Promise.all(searchResults.results.map(async (result:any) => {
              const searchedMedia = await getMedia(result.product_id);
            return searchedMedia;
          }));
        
          return mediaArray;
        } catch {
          throw new Error("Error getting searched media");
        }   
      } else {
          throw new Error("Search failed or returned null/undefined.");
      }
    } catch (error) {
      throw new Error("Error with similarity search on audio files");
    }
}

export { similaritySearchFromAudio };
