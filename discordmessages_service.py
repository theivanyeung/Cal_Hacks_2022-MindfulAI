import time
import requests
import json 

def default_request(endpoint: str, auth_key: str):
    headers = {
        'authorization': auth_key
    }
    response = requests.get(
        url=endpoint, 
        headers=headers
    )
    return response

def append_message(message: json, array: list):
    array.append(
        {
            'text': message['content'],
            'message_id': message['id'],
            'timestamp': message['timestamp'],
            'user_id': message['author']['id']
        }
    )

def retrieve_messages(
    channel_id: int,
    auth_key: str,
    user_id: str = None,
    limit: int = 50,
    await_time: float = .25,
    num_messages: int = 5,
):
    returnArr = []
    response = default_request(
        endpoint=f'https://discord.com/api/v8/channels/{channel_id}/messages?limit=1',
        auth_key=auth_key,
    )

    first_message = json.loads(response.text)
    if(len(first_message) == 0):
        raise Exception("no messages in channel")
    append_message(first_message[0], returnArr)

    for i in range(num_messages):
        try:
            last_message_id = returnArr[len(returnArr) - 1]['message_id']
            response = default_request(
                endpoint=f'https://discord.com/api/v8/channels/{channel_id}/messages?limit={limit}&before={last_message_id}',
                auth_key=auth_key,
            )
            messages = json.loads(response.text)

            if(len(messages) == 0):break
            if(response.status_code != 200):break

            for message in messages:
                author = message['author']
                if(user_id == None or
                author['id'] == user_id):
                    append_message(message, returnArr)
            time.sleep(await_time)

        except Exception as e:
            raise Exception(f'failed to fetch messages in channel {channel_id}')

    return returnArr

def get_user_id(auth_key: str):
    user_id = default_request(
        endpoint='https://discord.com/api/v9/users/@me',
        auth_key=auth_key
    ).json()
    return user_id['id']

def get_channels(auth_key: str, limit=10):
    dms = default_request(
        endpoint='https://discord.com/api/v9/users/@me/channels',
        auth_key=auth_key
    ).json()
    return dms[:limit]

def write_all_dms(file_name: str, auth_key: str):
    dms = get_channels(auth_key)
    for dm in dms:
        try:
            channel_messages = retrieve_messages(
                channel_id=dm['id'],
                limit=100
            )
        except:
            continue
        out = open(file_name, "a", encoding='utf-8')
        out.write('DM \n')
        for message in channel_messages:
            out.write(message['text'] + '\n')
        out.write('\n\n\n')
    out.close()
