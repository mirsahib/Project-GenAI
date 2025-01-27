import psycopg2
import pandas as pd
from concurrent.futures import ThreadPoolExecutor
from typing import List
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import psycopg2.extras
import numpy as np
import uuid
# psycopg2.extensions.register_adapter(list, psycopg2.extras.Json)
psycopg2.extensions.register_adapter(np.ndarray, psycopg2.extensions.adapt)

# Database configuration
db_config = {
    'dbname': 'root',
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'port': 5432
}

# Load the Universal Sentence Encoder model
print("Loading Universal Sentence Encoder model...")
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
print("Model loaded successfully.")


def connect_to_db():
    """Establish a connection to the database."""
    return psycopg2.connect(**db_config)


def read_csv(filepath: str) -> pd.DataFrame:
    """Read the CSV file and return a DataFrame."""
    return pd.read_csv(filepath)


def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """Generate text embeddings for a batch of texts."""
    processed_texts = [text if text and text != '[]' else '' for text in texts]
    embeddings = model.encode(processed_texts)
    return embeddings.tolist()


def insert_single_recipe(recipe: dict):
    """
    Insert a single recipe into the database after generating its embedding.

    Args:
        recipe (dict): A dictionary containing the recipe details.
    """
    connection = connect_to_db()
    print("Connection established", connection)
    cursor = connection.cursor()

    try:
        # Generate embedding for the product name
        product_name = recipe['product_name'] if recipe['product_name'] and recipe['product_name'] != '[]' else ''
        recipe['product_name_vector'] = model.encode([product_name])[0].tolist()

        # Using a fixed vector for simplicity
        # product_name_vector = [1.0, 2.0, 3.0, 4.0, 5.0]  # Ensure it's a list of floats
        product_name_vector = recipe['product_name_vector']

        # SQL query
        # SQL query with createdAt set to NOW() (current timestamp)
        query = """
            INSERT INTO "Recipes" (
                id, recipe_name, ingredients, total_time, cuisine, 
                instructions, url, image_url, ingredient_count, 
                product_name, product_name_vector, "createdAt","updatedAt"
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW()
            )
        """


        # Ensure values match the number of placeholders
        values = (
            str(uuid.uuid4()),  # Generate a unique ID
            recipe['recipe_name'],
            recipe['ingredients'],
            recipe['total_time'],
            recipe['cuisine'],
            recipe['instructions'],
            recipe['url'],
            recipe['image_url'],
            recipe['ingredient_count'],
            recipe['product_name'],
            psycopg2.extensions.adapt(product_name_vector),  # Convert to PostgreSQL-compatible array
        )

        # Execute the query
        cursor.execute(query, values)
        connection.commit()
        print("Recipe inserted successfully.")

    except psycopg2.Error as db_error:
        print(f"PostgreSQL Error inserting recipe: {db_error}")
        connection.rollback()
    except Exception as e:
        print(f"Unexpected error inserting recipe: {e}")
        connection.rollback()
    finally:
        cursor.close()
        connection.close()

def insert_batch_to_db(batch: List[dict]):
    """Insert a batch of recipes into the database after generating embeddings."""
    connection = connect_to_db()
    cursor = connection.cursor()

    try:
        query = """
            INSERT INTO "Recipes" (
                id, recipe_name, ingredients, total_time, cuisine, 
                instructions, url, image_url, ingredient_count, 
                product_name, product_name_vector, "createdAt", "updatedAt"
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW()
            )
        """

        # Prepare values for each recipe
        values = [
            (
                str(uuid.uuid4()),  # Generate a unique ID for each recipe
                recipe['recipe_name'],
                recipe['ingredients'],
                recipe['total_time'],
                recipe['cuisine'],
                recipe['instructions'],
                recipe['url'],
                recipe['image_url'],
                recipe['ingredient_count'],
                recipe['product_name'],
                psycopg2.extensions.adapt(recipe['product_name_vector']),  # Convert to PostgreSQL-compatible array
            )
            for recipe in batch
        ]

        # Insert all records in one go
        cursor.executemany(query, values)
        connection.commit()
        print(f"Batch of {len(batch)} recipes inserted successfully.")

    except psycopg2.Error as db_error:
        print(f"PostgreSQL Error inserting batch: {db_error}")
        connection.rollback()
    except Exception as e:
        print(f"Unexpected error inserting batch: {e}")
        connection.rollback()
    finally:
        cursor.close()
        connection.close()


def process_batch(batch_df: pd.DataFrame):
    """Process a single batch: generate embeddings and insert into the database."""
    try:
        print(f"Processing batch of size {len(batch_df)}...")
        batch_embeddings = generate_embeddings(batch_df['product_name'].tolist())
        recipes = batch_df.to_dict(orient='records')

        # Add embeddings to each recipe
        for recipe, embedding in zip(recipes, batch_embeddings):
            recipe['product_name_vector'] = embedding

        # Insert batch into the database
        insert_batch_to_db(recipes)
        print("Batch processed successfully.")
    except Exception as e:
        print(f"Error processing batch: {e}")

def main():
    # Filepath to the CSV file
    csv_filepath = "recipe_with_ids.csv"

    # Read the CSV
    print("Reading CSV file...")
    df = read_csv(csv_filepath)
    connection = connect_to_db()
    print("connection established", connection)
    # Batch size
    batch_size = 10

    # Split the DataFrame into batches
    batches = [df[i:i + batch_size] for i in range(0, len(df), batch_size)]

    # Use ThreadPoolExecutor for multithreading
    with ThreadPoolExecutor(max_workers=4) as executor:
        executor.map(process_batch, batches)


if __name__ == "__main__":
    single_recipe = {
        'id': 1,
        'recipe_name': 'Spaghetti Carbonara',
        'ingredients': '["spaghetti", "eggs", "parmesan cheese", "bacon"]',
        'total_time': 30,
        'cuisine': 'Italian',
        'instructions': 'Boil pasta. Cook bacon. Mix eggs and cheese. Combine all.',
        'url': 'http://example.com/spaghetti-carbonara',
        'image_url': 'http://example.com/image.jpg',
        'ingredient_count': 4,
        'product_name': 'spaghetti carbonara',
    }
    print("Inserting a single recipe...")
    # insert_single_recipe(single_recipe)
    main()
