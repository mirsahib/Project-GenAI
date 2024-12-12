import os 
import ast
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class ProductMapping:
    def __init__(self, product_file_path, recipe_file_path):
        self.product_file_path = product_file_path
        self.recipe_file_path = recipe_file_path
        self.data = self._read_csv()
        self.edible_products_categories = [
            'Foodgrains, Oil & Masala',
            'Gourmet & World Food',
            'Snacks & Branded Foods',
            'Eggs, Meat & Fish',
            'Bakery, Cakes & Dairy',
            'Beverages',
            'Fruits & Vegetables'
        ]
        self.stop_word = ['water', 'salt']
        self.model_name = 'all-MiniLM-L6-v2'
        self.model = SentenceTransformer(self.model_name)
        self.threshold = 0.6
        self.cache = {}
        self.product_embeddings = None
        self.embedding_file = 'product_embeddings.npy'

    def _read_csv(self):
        """Reads the CSV file using pandas and returns a DataFrame."""
        try:
            product = pd.read_csv(self.product_file_path)
            recipe = pd.read_csv(self.recipe_file_path)
            return {'product': product, 'recipe': recipe}
        except FileNotFoundError:
            print(f"The file {self.product_file_path} was not found.")
            print(f"The file {self.recipe_file_path} was not found.")
            return pd.DataFrame()  # Return an empty DataFrame if the file is not found
        except Exception as e:
            print(f"An error occurred: {e}")
            return pd.DataFrame()  # Return an empty DataFrame in case of an error

    def get_product_data(self):
        return self.data['product']

    def get_recipe_data(self):
        return self.data['recipe']

    def find_unique_product_categories(self):
        return self.data['product']['Category'].unique()

    def extract_edible_products(self):
        product = self.data['product']
        edible_products = product[
            product['category'].isin(self.edible_products_categories)
        ]
        self.data['product'] = edible_products

    def extract_recipe_ingredients(self):
        recipe = self.data['recipe']
        recipe['IngredientName'] = recipe['Ingredients'].apply(
            lambda ingredients: [item['name']
                                 for item in ast.literal_eval(ingredients)]
            if isinstance(ingredients, str) else [item['name'] for item in ingredients]
        )
        self.data['recipe'] = recipe
        return recipe['IngredientName']
    
    def formate_recipe_ingredients(self,recipe_col):
        recipe = self.data['recipe']
        recipe [recipe_col] = recipe[recipe_col].apply(lambda x: [ingredient.strip() for ingredient in x.split(',')])
        self.data['recipe'] = recipe
        return recipe

    def compute_product_embeddings(self,product_col):
        if os.path.exists(self.embedding_file):
            print("Loading product embeddings from file...")
            self.product_embeddings = np.load(self.embedding_file)
        else:
            print("Computing product embeddings...")
            product = self.data['product'][product_col]
            self.product_embeddings = self.model.encode(product, show_progress_bar=True)
            np.save(self.embedding_file, self.product_embeddings)
            print("Product embeddings saved to file.")

    def get_mapped_products(self, ingredients, products):
        print('Model loaded')
        best_matches = []

        # Separate ingredients into cached and non-cached
        ingredients_to_process = []
        for ingredient in ingredients:
            # Check cache
            if ingredient in self.cache:
                # Use cached result
                best_matches.append(self.cache[ingredient])
                print(f'Cache hit for ingredient: {ingredient}, mapped to: {self.cache[ingredient]}')
            else:
                # Process this ingredient if not cached
                ingredients_to_process.append(ingredient)

        # Encode only the ingredients that need processing
        if ingredients_to_process:
            ingredient_embeddings = self.model.encode(
                ingredients_to_process, show_progress_bar=True)
            similarity_matrix = cosine_similarity(
                ingredient_embeddings, self.product_embeddings)
            print('Similarity matrix calculated')

        # Find best match for non-cached ingredients and update the cache
        for i, ingredient in enumerate(ingredients_to_process):
            similarities = similarity_matrix[i]
            best_match_idx = np.argmax(similarities)
            best_score = similarities[best_match_idx]
            best_product = products[best_match_idx]

            print(
                f'Best match for {ingredient} is {best_product}')
            if best_score >= self.threshold:
                best_matches.append(best_product)
                self.cache[ingredient] = best_product  # Update cache
            else:
                print(
                    f'No suitable match for {ingredient} (similarity below threshold)')

        return best_matches
    
    
    def map_ingredients_to_products(self,product_col,recipe_col):
        self.formate_recipe_ingredients(recipe_col)
        # self.extract_edible_products()
        productName = self.data['product'][product_col]
        ingredientName = self.data['recipe'][recipe_col]

        recipe = self.data['recipe']
        mapped_products = []
        self.compute_product_embeddings(product_col)
        for row in ingredientName:
            filtered_ingredients = [
                ingredient for ingredient in row if ingredient.lower() not in self.stop_word]
            ingredient_to_product = self.get_mapped_products(
                filtered_ingredients, productName)
            mapped_products.append(ingredient_to_product)

        recipe['ProductName'] = mapped_products
        # recipe = recipe.drop(columns=[recipe_col])
        recipe.to_csv('mapped_recipes.csv', index=False)
    def recommend_recipies(self,user_products):
        try:
            df = pd.read_csv('mapped_recipes.csv')
            df['ProductName'] = df['ProductName'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)
    
            # Calculate the overlap count for each recipe
            df['MatchCount'] = df['ProductName'].apply(lambda products: len(set(products) & set(user_products)))
    
            # Get the row with the maximum match count
            best_match = df.loc[df['MatchCount'].idxmax()]
            
            # Drop the 'MatchCount' column as it's for internal use
            best_match = best_match.drop(labels='MatchCount')
            
            return best_match
        except Exception as e:
            print(f"An error occurred: {e}")
        


def main():
    productMapping = ProductMapping(
        './edible_products.csv', '../data/Indian_Food_Dataset.csv')
    # print(productMapping.get_product_data())
    # print(productMapping.get_recipe_data())
    # print(productMapping.find_unique_product_categories())
    # print(productMapping.extract_edible_products())
    # print(productMapping.extract_recipe_ingredients())
    productMapping.map_ingredients_to_products('product_name', 'Ingredients')
    # product = ['Curry Leaves', 'Urad - Black, Whole/Sabut']
    # print(productMapping.recommend_recipies(product))


if __name__ == '__main__':
    main()
