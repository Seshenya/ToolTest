import numpy as np
import requests
import os
import tensorflow as tf
import matplotlib.pyplot as plt


import sys

if __name__ == "__main__":

    if os.path.exists("./patterns.npz") == False:
        print("patterns Mnist missing....")

    data = np.load("patterns.npz")
    traind = data["arr_0"]
    testd = data["arr_1"]
    trainl = data["arr_2"]
    testl = data["arr_3"]

    if sys.argv[1] == 'train':
        model = tf.keras.Sequential()

        model.add(tf.keras.layers.Conv2D(
            16, (3, 3), strides=(1, 1)))
        model.add(tf.keras.layers.ReLU())

        model.add(tf.keras.layers.MaxPooling2D(
            pool_size=(2, 2), strides=(2, 2)))

        model.add(tf.keras.layers.Conv2D(32, (3, 3), strides=(1, 1)))
        model.add(tf.keras.layers.ReLU())

        model.add(tf.keras.layers.MaxPooling2D(
            pool_size=(2, 2), strides=(2, 2)))

        model.add(tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1)))
        model.add(tf.keras.layers.ReLU())

        model.add(tf.keras.layers.MaxPooling2D(
            pool_size=(2, 2), strides=(2, 2)))

        model.add(tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1)))
        model.add(tf.keras.layers.ReLU())

        model.add(tf.keras.layers.MaxPooling2D(
            pool_size=(2, 2), strides=(2, 2)))

        model.add(tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1)))
        model.add(tf.keras.layers.ReLU())

        model.add(tf.keras.layers.MaxPooling2D(
            pool_size=(2, 2), strides=(2, 2)))

        model.add(tf.keras.layers.Flatten())

        model.add(tf.keras.layers.Dense(512))
        model.add(tf.keras.layers.ReLU())

        tf.keras.layers.Dropout(0.5)

        model.add(tf.keras.layers.Dense(1, activation='sigmoid'))

        opt = tf.keras.optimizers.Adam(learning_rate=0.001)
        loss = tf.keras.losses.BinaryCrossentropy()

        model.compile(optimizer=opt, loss=loss,
                      metrics=['accuracy'])

        # # Early Stopping
        # earlystopping = tf.keras.callbacks.EarlyStopping(monitor="categorical_accuracy",
        #                                                  mode="auto", patience=3,
        #                                                  restore_best_weights=True)

        model.fit(traind, trainl, epochs=15)

        print(model.evaluate(testd, testl))

        model.save('./patterns_model.keras')
        print('Model Saved')

        model.summary()

    if sys.argv[1] == 'test':
        if os.path.exists("./patterns_model.keras") == False:
            print('Model Missing')
        else:
            print('Loading Model...')
            model = tf.keras.models.load_model('./patterns_model.keras')

            # print(model.evaluate(testd, testl))
            # model.summary()

            # displaying confusion matrix
            N = 40
            print(len(testd))
            predictions = model.predict(testd[30:N])
            threshold = 0.5
            binary_predictions = (predictions > threshold).astype(int)
            print(binary_predictions)

            f, axes = plt.subplots(2, 5)
            for (ax, img) in zip(axes.ravel(), testd[30:N]):
                ax.imshow(img)
            plt.show()

    if sys.argv[1] == 'check':
        print("Shape of traind:", traind.shape, trainl.shape)
        print("Shape of testd:", testd.shape, testl.shape)
        N = 0
        print(trainl[0:N])
        f, axes = plt.subplots(2, 5)
        for (ax, img) in zip(axes.ravel(), traind[0:N]):
            ax.imshow(img)
        plt.show()
