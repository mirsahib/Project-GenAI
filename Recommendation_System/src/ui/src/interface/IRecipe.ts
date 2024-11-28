interface IRecipe{
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
}

interface RecipeResponse {
    success: boolean;
    data: {
        products: IRecipe[];
        catagories: string[];
    };
    metaData: {
        currentPage: number;
        totalCount: number;
        totalPages: number;
        limit: number;
    };
    error?: string; // Optional in case of failure
}
export {IRecipe, RecipeResponse}