from pydantic import BaseModel

class auth_key_payload(BaseModel):
    auth_key: str

class channel_analysis(BaseModel):
    channel_id: int
    auth_key: str