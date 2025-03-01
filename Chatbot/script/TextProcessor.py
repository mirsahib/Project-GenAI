import re


class TextProcessor:
    def __init__(self):
        pass

    def preprocessing(self, text):
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        return text

    def get_chunks(self, text):
        chunks = []
        for chunk in text.split():
            chunks.append(chunk)
        return chunks
