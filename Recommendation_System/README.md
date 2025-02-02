# Grocery Recommendation System  

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

  

