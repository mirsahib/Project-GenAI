import {  NextFunction, Request, Response } from "express"
import errorMessage from '../util/error-handler'
import RecipeRepository from "../database/repository/recipe.repository"


class RecipeService {
    private RecipeRepository: RecipeRepository

    constructor() {
        this.RecipeRepository = new RecipeRepository()
    }
    
    readAll = async (req: Request, res: Response) => {
        try {
            const products = await this.RecipeRepository.read()
            res.json({ products })
        } catch (error) {
            errorMessage(error,res)
        }
    }
    

}

export default RecipeService