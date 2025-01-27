import {  Request, Response } from "express"
import errorMessage, { CustomError } from '../util/error-handler'
import RecipeRepository from "../database/repository/recipe.repository"
import {spawn} from 'child_process'
import path from 'path'
import fs from 'fs'
class RecipeService {
    private RecipeRepository: RecipeRepository

    constructor() {
        this.RecipeRepository = new RecipeRepository()
    }

    generateRecipe = async (req: Request, res: Response) => {
        try {
            const productNameArr = req.body.product_name as string[]
            if (
                !Array.isArray(productNameArr) || 
                !productNameArr.every(item => typeof item === 'string')
            ) {
                throw new CustomError("Invalid input: 'product_name' must be an array of strings", 400);
            }
            let productName = productNameArr.join(',')
            // generate embedding for the product name
            
            const embedding = await this.generateEmbedding(productName) 
            const recipe = await this.RecipeRepository.generateRecipe(embedding)
            res.json({ success: true,  data: {recipies:recipe} })
        } catch (error) {
            errorMessage(error, res)
        }
    }

    private async generateEmbedding(productName:string){
        return new Promise((resolve, reject) => {
            const scriptPath = path.resolve(__dirname, '../util/child_process/generate_embedding.py');

            if (!fs.existsSync(scriptPath)) {
                throw new Error(`Python script not found at ${scriptPath}`);
            }
    

            const process = spawn('python3',[scriptPath,productName]);
             
            // Send the product name as JSON input to the Python script
            process.stdin.write(JSON.stringify({ product_name: productName }));
            process.stdin.end();
    
            let output = '';
            let error = '';
    
            // Capture the output from the Python script
            process.stdout.on('data', (data) => {
                output += data.toString();
            });
    
            // Capture any error messages
            process.stderr.on('data', (data) => {
                error += data.toString();
            });
    
            // Handle process exit
            process.on('close', (code) => {
                if (code !== 0) {
                    return reject(new Error(`Python script exited with code ${code}: ${error}`));
                }
                try {
                    const result = JSON.parse(output);
                    if (result.error) {
                        return reject(new Error(result.error));
                    }
                    resolve(result.embedding);
                } catch (parseError) {
                    reject(new Error(`Failed to parse Python script output: ${output}`));
                }
            });
        });
    }
}

export default RecipeService

