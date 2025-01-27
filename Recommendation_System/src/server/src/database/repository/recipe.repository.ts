import { Op, Sequelize, QueryTypes } from "sequelize";
import PostgresService from "../PostgresService";

class RecipeRepository {
    generateRecipe = async (productEmbedding: any) => {
        const embeddingVector = `[${productEmbedding.join(",")}]`;
        const query = `
        SELECT 
            recipe_name,
            product_name,
            ingredients,
            total_time,
            cuisine,
            instructions,
            url,
            image_url,
            ingredient_count,
            (product_name_vector::vector(384)) <=> (?::vector(384)) AS similarity
        FROM "Recipes"
        ORDER BY similarity ASC
        LIMIT ?;
        `;
        const sequelize = PostgresService.getInstance().getConnection()

        const results = await sequelize.query(query, {
            replacements: [embeddingVector, 5], // Safely pass the embedding and limit
            type: QueryTypes.SELECT, // Ensure results are returned as plain objects
        });

        return results; // Return the fetched recipes
    }
}

export default RecipeRepository