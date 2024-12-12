import {  Request, Response } from "express"
import errorMessage, { CustomError } from '../util/error-handler'
import RecipeRepository from "../database/repository/recipe.repository"


class RecipeService {
    private RecipeRepository: RecipeRepository

    constructor() {
        this.RecipeRepository = new RecipeRepository()
    }

    generateRecipe = async (req: Request, res: Response) => {
        try {
            const productName = req.body.product_name as string[]
            if (
                !Array.isArray(productName) || 
                !productName.every(item => typeof item === 'string')
            ) {
                throw new CustomError("Invalid input: 'product_name' must be an array of strings", 400);
            }
            const recipe = await this.RecipeRepository.generateRecipe(productName)
            res.json({ success: true,  data: recipe })
        } catch (error) {
            errorMessage(error, res)
        }
    }


}

export default RecipeService