import tensorflow as tf
import pandas as pd
import numpy as np
from pprint import pprint
from tensorflow import keras
from keras import layers
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences
from keras.layers import Embedding, LSTM, Dense, Bidirectional
from keras.models import Sequential
from keras.optimizers import Adam

data = pd.read_csv('micro_model.csv')

tokenizer = Tokenizer(oov_token = "<OOV>")
tokenizer.fit_on_texts(data['quote_name'].dropna())
total_words = len(tokenizer.word_index) + 1

word_index = tokenizer.word_index
sequences = tokenizer.texts_to_sequences(data['quote_name'].dropna())
padded = pad_sequences(sequences, padding="post", maxlen=500)
train_labels, train_data = data['quote_tags_name'].dropna(), data['quote_name'].dropna()

model = Sequential([
    keras.layers.Embedding(total_words, 16, input_length=500),
    keras.layers.GlobalAveragePooling1D(),
    keras.layers.Dense(16, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics =['accuracy'])
history = model.fit(padded, ((train_labels == 'race').astype(int)), epochs=160, batch_size=512)

model.save(r"./models/micro_race_model")
'''
tokenizer2 = Tokenizer(oov_token = "<OOV>")

tokenizer2.fit_on_texts(test_data.dropna())

sequences2 = tokenizer2.texts_to_sequences(test_data.dropna())
padded2 = pad_sequences(sequences2, padding="post", maxlen=500)
pred = model.predict(padded2)
'''