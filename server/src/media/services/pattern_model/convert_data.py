import numpy as np
import os
import cv2
import sys
from collections import Counter

folder = 'patterns_mnist'

npzFileName = 'patterns.npz'


def convertToNpz():

    images = []
    labels = []
    labelCount = {}

    for filename in os.listdir(folder):
        imagePath = os.path.join(folder, filename)
        image = cv2.imread(imagePath)
        if image is not None:
            image = cv2.resize(image, (200, 200))
            min_val = np.min(image)
            max_val = np.max(image)
            fixed_image = (image - min_val) / (max_val - min_val)
            images.append(fixed_image)

            label = filename.split('-')[0]
            labels.append(int(label))
            if (label not in labelCount):
                labelCount[label] = 1
            else:
                labelCount[label] += 1

    print(labelCount)

    images = np.array(images)
    labels = np.array(labels)

    randomIndex = np.array([])

    # Fixing Oversampling
    sampleSize = 2400

    for x in labelCount:
        indexX = np.where(labels == int(x))[0]
        samplesX = np.random.choice(
            indexX, sampleSize, replace=False if len(indexX) >= sampleSize else True)
        randomIndex = np.concatenate((randomIndex, samplesX), axis=0)

    randomIndex = randomIndex.astype(int)
    N = len(randomIndex)

    # # Train - Test Data Split
    np.random.shuffle(randomIndex)
    percIndex = int(0.8 * N)

    traind = images[randomIndex[0:percIndex]]
    trainl = labels[randomIndex[0:percIndex]]
    testd = images[randomIndex[percIndex:]]
    testl = labels[randomIndex[percIndex:]]

    np.savez(npzFileName, traind, testd, trainl, testl)


convertToNpz()
