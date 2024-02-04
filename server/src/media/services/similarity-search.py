from flask import Flask, request, jsonify
from gensim.models import Word2Vec
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from sklearn.metrics.pairwise import cosine_similarity
#import tensorflow as tf
#import tensorflow_hub as hub
from gensim.models import KeyedVectors

app = Flask(__name__)

glove_model = KeyedVectors.load_word2vec_format('glove.6B.300d.txt', binary=False, no_header=True)
@app.route('/search_audio', methods=['POST'])

def search_audio():

    # Get JSON data from the request body
    data = request.get_json()
    searchData = data['searchData']

    if 'search_term' in searchData and 'audio_transcriptions' in searchData:

        # check if audio_transcriptions is a list
        if not isinstance(searchData['audio_transcriptions'], list):
            return jsonify({"error": "audio_transcriptions should be a list"}), 400

        search_term = searchData['search_term']
        audio_transcriptions = searchData['audio_transcriptions']

        # Tokenize and vectorize documents and query
        def vectorize_text(text, model):
            words = text.lower().split()
            vectors = [model[word] for word in words if word in model.index_to_key]
            return sum(vectors) / len(vectors) if vectors else None
        document_vectors = [vectorize_text(doc["transcribed_text"], glove_model) for doc in audio_transcriptions]
        query_vector = vectorize_text(search_term, glove_model)

        # Compute cosine similarity
        if query_vector is not None and all(doc_vector is not None for doc_vector in document_vectors):
            similarities = [cosine_similarity([query_vector], [doc_vector])[0][0] for doc_vector in document_vectors]

            print("Similaraties", similarities)
            filtered_documents = [
                    {"product_id": audio_transcriptions[i]["product_id"], "transcribed_text": audio_transcriptions[i]["transcribed_text"], "similarity": float(similarities[i])}
                for i in range(len(similarities)) if similarities[i] > 0
            ]

            if not filtered_documents:
                return jsonify({"results": []})

            sorted_documents = sorted(filtered_documents, key=lambda x: x["similarity"], reverse=True)
            most_similar_documents = sorted_documents[:3]
            print("most similar", most_similar_documents)

            # most_similar_index = similarities.index(max(similarities))
            # most_similar_document = audio_transcriptions[most_similar_index]

            # Return a JSON response
            return jsonify({"results": most_similar_documents })
        else:
            return jsonify({"error": "Invalid vectors. Unable to compute cosine similarity."}), 500
    else:
        return jsonify({"error": "Missing 'search_term' or 'audio_transcriptions' in the request body"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')