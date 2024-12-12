import csv
import uuid
from datetime import datetime

# Input and output CSV file paths
input_csv_path = '../data/mapped_recipes.csv'
output_csv_path = 'recipe_with_ids.csv'

# Read the CSV file and add a UUID column along with createdAt and updatedAt columns
def add_uuid_and_timestamp_columns_to_csv(input_path, output_path):
    try:
        with open(input_path, mode='r', newline='', encoding='utf-8') as input_file:
            reader = csv.DictReader(input_file)
            fieldnames = ['id', 'createdAt', 'updatedAt'] + reader.fieldnames  # Add 'id', 'createdAt', and 'updatedAt' as the first columns
            
            with open(output_path, mode='w', newline='', encoding='utf-8') as output_file:
                writer = csv.DictWriter(output_file, fieldnames=fieldnames)
                writer.writeheader()
                
                current_time = datetime.now().isoformat()  # Get the current date and time
                
                for row in reader:
                    row['id'] = str(uuid.uuid4())  # Generate a UUID for each row
                    row['createdAt'] = current_time  # Add current date to createdAt
                    row['updatedAt'] = current_time  # Add current date to updatedAt
                    writer.writerow(row)
        
        print(f"CSV file with UUIDs and timestamps written to: {output_path}")
    except FileNotFoundError:
        print(f"Error: The file {input_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Run the function
add_uuid_and_timestamp_columns_to_csv(input_csv_path, output_csv_path)