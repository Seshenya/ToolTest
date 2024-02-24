import sys
import cv2
import numpy as np
import tensorflow as tf
import requests
# Load the trained model
model = tf.keras.models.load_model('src/media/services/patterns_model.keras')


def preprocess_image(image):
    image = cv2.resize(image, (200, 200))
    min_val = np.min(image)
    max_val = np.max(image)
    print(min_val, max_val)
    fixed_image = (image - min_val) / (max_val - min_val)
    return np.expand_dims(fixed_image, axis=0)


def load_image_from_url(image_url):
    response = requests.get(image_url)
    image_data = np.frombuffer(response.content, dtype=np.uint8)
    image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
    return image

# Main function


def main():
    # Get image URL from command-line argument
    image_url = sys.argv[1]

    # Load the image from URL
    image = load_image_from_url(image_url)

    # Preprocess the image
    if (image is not None):
        image = preprocess_image(image)

        # Perform inference
        predictions = model.predict(image)

        # Print the prediction output
        threshold = 0.5
        binary_predictions = (predictions > threshold).astype(str)
        print(binary_predictions)
        return str(binary_predictions[0][0])

    return 0


if __name__ == "__main__":
    main()
