# Recipe Recommendation System  

### 🛒 **Project Description**  
The Grocery Recommendation System is an intelligent tool that helps users discover recipes based on the groceries they have purchased or already have on their shelves. By leveraging **natural language processing (NLP)**, the system matches users' products to suitable recipes and identifies any missing ingredients. This tool offers personalized recommendations and can enhance the user experience for online grocery stores by acting as a seamless integration into their platforms.  

---

### 🌟 **Motivation**  
When users buy products from online grocery stores, they often wonder:  
- *What dishes can I make with these items?*  
- *What additional ingredients do I need to prepare a specific recipe?*  

This project aims to solve this problem by providing tailored recipe recommendations based on a user's purchased products. It also highlights missing ingredients, helping users make informed decisions. This feature can be a valuable addition to online grocery platforms, improving user engagement and satisfaction.  

---

### ⚙️ **Key Features**  
- **Recipe Recommendations**: Suggests recipes based on purchased or available grocery items.  
- **Missing Ingredients Identification**: Highlights ingredients that are required but not present.  
- **Seamless Integration**: Designed to integrate into online grocery platforms to enhance user experience.  
- **Efficient Algorithm**: Uses state-of-the-art NLP models to ensure precise recommendations.  

---

### 📂 **Datasets**  
1. **Product Dataset**: [BigBasket Kaggle Dataset](https://www.kaggle.com/datasets/surajjha101/bigbasket-entire-product-list-28k-datapoints).  
2. **Recipe Dataset**: [Indian Food Recipes Dataset (Cleaned Version)](https://www.kaggle.com/datasets/sooryaprakash12/cleaned-indian-recipes-dataset).  

---

### 🛠️ **Tech Stack**  
- **Frontend**: React  
- **Backend**: Node.js  
- **Database**: PostgreSQL  
- **AI Model**: Python (Hugging Face Sentence Transformer, Cosine Similarities)  

---

### 🚀 **How It Works**  
1. **Product Input**: Users select items from the product cataloge.  
2. **NLP Matching**: The AI model processes the input and matches it against the recipe dataset using the Hugging Face Sentence Transformer and cosine similarity to find the best matches.  
3. **Recommendations**: Recipes that can be prepared with the available items are displayed. Missing ingredients are highlighted for user convenience.  

---


### 📥 **Setup Instructions**  

#### Prerequisites  
- Node.js  
- Python 3.x  
- PostgreSQL 

#### Steps to Run  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/mirsahib/Project-GenAI.git
   cd Project-GenAI/Recommendation_System/src/
   ```
## 🧹 Data Preprocessing  

The original product dataset contains over **9,000 product entries**, categorized into **11 different groups**. However, not all categories contain edible products relevant to our recommendation system.  

### 🔹 **Filtering Edible Products**  
Out of the 11 categories, only the following are considered **edible**:  
- **Foodgrains, Oil & Masala**  
- **Gourmet & World Food**  
- **Snacks & Branded Foods**  
- **Eggs, Meat & Fish**  
- **Bakery, Cakes & Dairy**  
- **Beverages**  
- **Fruits & Vegetables**  

After filtering, the dataset consists of:  
- **Edible Products:** 2,409  
- **Non-Edible Products:** 5,799  

This refined subset is used to train our recommendation model.  

### 📊 **Exploratory Data Analysis (EDA)**  
A primary **EDA** on the product dataset, including category distributions, missing value analysis, and key insights, is documented in the **`src/notebook/`** folder. This analysis helps in understanding data patterns and refining preprocessing techniques.

## 🧠 Algorithm  

The recommendation system is designed to suggest recipes based on the products a user has purchased or already possesses. However, a key challenge is that the **recipe ingredient names** do not exactly match the **product names** from the grocery dataset. To bridge this gap, we leverage **sentence embeddings** to compute similarities and associate products with relevant recipes.  

### 🔹 **Step-by-Step Process**  

1. **Data Preparation**  
   - The **product dataset** contains product names, while the **recipe dataset** includes a list of ingredients.  
   - Ingredients in recipes may have different wording or variations compared to product names.  

2. **Encoding Product Names & Recipe Ingredients**  
   - We use **Sentence Transformers** to generate high-dimensional vector representations (embeddings) for both **product names** and **recipe ingredients**.  
   - This helps capture semantic similarities even when exact word matches are unavailable.  

3. **Matching Products to Recipes**  
   - For each **ingredient** in the recipe dataset, we compute the similarity score with all available **product names** from the product dataset.  
   - The **best matching product name** is assigned to the respective recipe.  
   - The **matched product name** is stored in the recipe dataset in a new column named **`ProductName`**.  
   - The corresponding **vector representation** of the product name is also stored in a new column named **`product_name_vector`**.  

4. **Recommendation Algorithm**  
   - When a user inputs a **product name**, we generate its **vector encoding** using the same sentence transformer model.  
   - We perform a similarity search against the **`product_name_vector`** column in the recipe dataset using **PostgreSQL pg_vector** extension.  
   - The recipes with the highest similarity scores are returned as recommendations.  

### 🔍 **Why Sentence Transformers & pg_vector?**  
- **Sentence Transformers** allow us to capture **semantic meaning** beyond keyword matching, improving recommendation accuracy.  
- **pg_vector** provides efficient **vector-based similarity search**, making retrieval fast and scalable within PostgreSQL.  

This approach ensures that users receive **accurate and relevant** recipe suggestions based on the groceries they have.  


  

