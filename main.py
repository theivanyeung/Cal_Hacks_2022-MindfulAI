from fastapi import FastAPI
from discord_helpers import contains
from discordmessages_payload import auth_key_payload, channel_analysis
import discordmessages_service as service
import tensorflow as tf
from tensorflow import keras
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences

app = FastAPI()
hate_model = keras.models.load_model(r'./models/hate_model')
micro_model = keras.models.load_model(r"./models/micro_race_model")

# hmm
@app.post('/get_channels')
def get_channels(
    payload: auth_key_payload
):
    channel_list: list = service.get_channels(
        auth_key = payload.auth_key
    )
    return {"channel_list": channel_list}

@app.get('/channel_analysis')
def channel_analysis(
    payload: channel_analysis
):
    user_id = service.get_user_id(
        auth_key = payload.auth_key
    )
    channel_messages = service.retrieve_messages(
        channel_id = payload.channel_id,
        auth_key = payload.auth_key,
        user_id=user_id,
    )
    #hate_model
    predict_array = list(map(lambda x: x['text'], channel_messages))
    print("PREDICT", predict_array)
    tokenizer2 = Tokenizer(oov_token = "<OOV>")
    #whatever the label is
    tokenizer2.fit_on_texts(predict_array)
    #switch to whatever the label is
    sequences2 = tokenizer2.texts_to_sequences(predict_array)
    padded2 = pad_sequences(sequences2, padding="post", maxlen=500)
    #predict something in this model
    pred_hate = hate_model.predict(padded2)
    pred_micro =  micro_model.predict(padded2)
    x = 0
    for item in channel_messages:
        a = pred_hate[x].item()
        b = pred_micro[x].item()
        item['hate_predictions'] = a
        item['micro_preidctions'] = b
        if(contains(predict_array[x]) != "" and len(predict_array[x]) > 4):
            item['micro_preidctions'] = 1
            item['tags'] = contains(predict_array[x])
        x += 1
    return {"channel_list": channel_messages}