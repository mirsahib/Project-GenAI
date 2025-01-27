import psycopg2
import numpy as np
from sentence_transformers import SentenceTransformer

# Database configuration
db_config = {
    'dbname': 'root',
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'port': 5432
}

# Load the SentenceTransformer model
print("Loading Universal Sentence Encoder model...")
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
print("Model loaded successfully.")


def connect_to_db():
    """Establish a connection to the database."""
    try:
        connection = psycopg2.connect(**db_config)
        print("Database connection established.")
        return connection
    except Exception as e:
        print("Error connecting to database:", e)
        raise


def get_top_recipes_cast(connection, product_vector, top_n=5):
    """
    Find the top N closest recipes using pgvector functionality and return the rows.
    """
    try:
        with connection.cursor() as cursor:
            # Query with explicit casting of float[] to vector
            query = f"""
                SELECT recipe_name,product_name,ingredients, (product_name_vector::vector(384)) <=> (%s::vector(384)) AS similarity
                FROM "Recipes"
                ORDER BY similarity ASC
                LIMIT {top_n};
            """
            cursor.execute(query, (product_vector.tolist(),))
            results = cursor.fetchall()

            if results:
                # Fetch the column names for clarity
                column_names = [desc[0] for desc in cursor.description]
                return [dict(zip(column_names, row)) for row in results]
            else:
                return []
    except Exception as e:
        print("Error fetching top recipes:", e)
        raise

def main():
    product_name_arr = ['Potato', 'Onion']
    product_name = ', '.join(product_name_arr)

    # Generate embedding for the product name
    product_vector = model.encode(product_name)
    print(f"Vector generated for '{product_name}': {product_vector}")

    # Connect to the database
    connection = connect_to_db()

    try:
        # Fetch the top 5 closest recipes and print them
        top_recipes = get_top_recipes_cast(connection, product_vector, top_n=5)
        
        if top_recipes:
            print("The top 5 closest recipes are:")
            for i, recipe in enumerate(top_recipes, start=1):
                print(f"\nRecipe {i}:")
                for key, value in recipe.items():
                    print(f"{key}: {value}")
        else:
            print("No recipes found.")
    finally:
        connection.close()
        print("Database connection closed.")


if __name__ == "__main__":
    main()
