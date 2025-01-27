interface Recipe{
    id: string
    recipe_name: string
    ingredients: string
    total_time: number
    cuisine: string
    instructions: string
    url: string
    image_url: string
    ingredient_count: number
    product_name: string
    similarity: number
}

interface RecipeResponse {
    success: boolean;
    data: {
        recipies: Recipe[];
    };
    metaData: {
        currentPage: number;
        totalCount: number;
        totalPages: number;
        limit: number;
    };
    error?: string; // Optional in case of failure
}
export {Recipe, RecipeResponse}