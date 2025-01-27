import pandas as pd

class ProductMapping:
    def __init__(self, product_file_path,recipe_file_path):
        self.product_file_path = product_file_path
        self.recipe_file_path = recipe_file_path
        self.data = self._read_csv()
    
    def _read_csv(self):
        """Reads the CSV file using pandas and returns a DataFrame."""
        try:
            product = pd.read_csv(self.product_file_path)
            recipe = pd.read_csv(self.recipe_file_path)
            return {'product':product,'recipe':recipe}
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
    
    def extract_edible_products(self):
        pass

    def extract_recipe_ingredients(self):
        pass

    def map_ingredients_to_products(self):
        pass

def main():
    ProductMapping = ProductMapping('../data/product.csv','../data/test_recipes.csv')
    print(ProductMapping.get_product_data())
    print(ProductMapping.get_recipe_data())


if __name__ == '__main__':
    main()