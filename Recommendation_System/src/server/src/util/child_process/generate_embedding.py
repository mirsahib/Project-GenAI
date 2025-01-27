import sys
import json
from sentence_transformers import SentenceTransformer
import os


cache_dir = os.getenv("HF_HOME", "/tmp/huggingface")
os.environ["HF_HOME"] = cache_dir


# print(f"Using Hugging Face cache directory: {cache_dir}", flush=True)
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
# print("Model loaded successfully.", flush=True)

def main():
    # Read input from command line arguments
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    product_name = data.get("product_name", "")

    if not product_name:
        print(json.dumps({"error": "Invalid product_name"}))
        sys.exit(1)

    # Generate embedding
    embedding = model.encode(product_name).tolist()
    # Return the embedding as JSON
    print(json.dumps({"embedding": embedding}),flush=True)

if __name__ == "__main__":
    main()
