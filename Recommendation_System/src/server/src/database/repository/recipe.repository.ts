import { Op, Sequelize } from "sequelize";
import RecipeModel from "../model/Recipe.model";


class RecipeRepository {
    generateRecipe = async (products: string[]) => {
        const searchPattern = products
            .map(product => product.toLowerCase())
            .join('%');

        const recipes = await RecipeModel.findAll({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.fn('array_to_string', Sequelize.col('product_name'), ',')),
                {
                    [Op.iLike]: `%${searchPattern}%`
                }
            )
        });
        return recipes
    }
}

export default RecipeRepository