import requests
import json
from FileProcessor import FileProcessor
from TextProcessor import TextProcessor
from EmbeddingManager import EmbeddingManager

class OllamaAPI:
    """A class to interact with the Ollama API."""

    def __init__(self, base_url="http://localhost:11434"):
        """Initializes the OllamaAPI object.

        Args:
            base_url: The base URL of the Ollama API.
        """
        self.base_url = base_url
        self.file_processor = FileProcessor()
        self.text_processor = TextProcessor()
        self.embedding_manager = EmbeddingManager()

    def _make_request(self, endpoint, data, stream=False):
        """Makes a request to the Ollama API."""
        url = f"{self.base_url}{endpoint}"
        try:
            response = requests.post(url, json=data, stream=stream)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None

    def generate(self, model_name, prompt, stream=False):
        """Generates text from an Ollama model."""
        endpoint = "/api/generate"
        data = {"model": model_name, "prompt": prompt, "stream": stream}
        response = self._make_request(endpoint, data, stream=stream)

        if response:
            if stream:
                for line in response.iter_lines():
                    if line:
                        decoded_line = line.decode('utf-8')
                        try:
                            json_line = json.loads(decoded_line)
                            if "response" in json_line:
                                yield json_line["response"]

                        except json.JSONDecodeError:
                            print(decoded_line)

            else:
                try:
                    result = response.json()
                    return result["response"]
                except KeyError:
                    print("Error: unexpected json response")
                    return None
        return None

    def chat(self, model_name, messages, stream=False):
        """Chats with an Ollama model."""
        endpoint = "/api/chat"
        data = {"model": model_name, "messages": messages, "stream": stream}
        response = self._make_request(endpoint, data, stream=stream)

        if response:
            if stream:
                for line in response.iter_lines():
                    if line:
                        decoded_line = line.decode('utf-8')
                        try:
                            json_line = json.loads(decoded_line)
                            if "message" in json_line and "content" in json_line["message"]:
                                yield json_line["message"]["content"]
                        except json.JSONDecodeError:
                            print(decoded_line)
            else:
                try:
                    result = response.json()
                    return result["message"]["content"]
                except KeyError:
                    print("Error: unexpected json response")
                    return None
        return None
    
    def upload_knowledge(self,file_path):
        text = self.file_processor.parse(file_path)
        processText = self.text_processor.preprocessing(text)
        print("pdf text",processText)

    


if __name__ == "__main__":
    path = '../data/document.pdf'
    ollama = OllamaAPI()
    ollama.upload_knowledge(path)


    # print("\nStreaming chat example:")
    # for chunk in ollama.chat("qwen", [{"role":"user","content":"What is the capital of Bangladesh?"}], stream=True):
    #     print(chunk, end="", flush=True)

    
    