import tensorflow as tf
import pandas as pd
from tensorflow import keras
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences
from keras.models import Sequential

data = pd.read_csv('hate_model.csv')

data.head()

tokenizer = Tokenizer(oov_token = "<OOV>")
#whatever the label is
tokenizer.fit_on_texts(data['Sentences'])
total_words = len(tokenizer.word_index) + 1
word_index = tokenizer.word_index
#switch to whatever the label is
sequences = tokenizer.texts_to_sequences(data['Sentences'])
padded = pad_sequences(sequences, padding="post", maxlen=500)
padded.shape

print(padded)
print(sequences)
print(word_index)
print(total_words)

#Switch the labels though once the model arrives
train_labels, train_data = data['Class'], data['Sentences']
train_labels -= 2

print(train_labels)

model = Sequential([
    keras.layers.Embedding(total_words, 16, input_length=500),
    keras.layers.GlobalAveragePooling1D(),
    keras.layers.Dense(16, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics =['accuracy'])
history = model.fit(padded, train_labels, epochs=200, batch_size=512)

model.save(r"./models/hate_model")

#predict something in this model
'''
data2 = pd.read_csv('calhacks.csv')
test_data = data2['Sentences']

pred = model.predict(test_data)
print(tf.math.round(pred))
'''