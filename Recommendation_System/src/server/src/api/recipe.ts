import { Express} from "express"
import storage from "../util/cloudinary"
import multer from 'multer'
import RecipeService from "../service/recipe.service"

class RecipeApi{

    private app:Express
    private RecipeService:RecipeService
    private upload:multer.Multer

    constructor(app:Express){
        this.app = app
        this.RecipeService = new RecipeService()
        this.upload = multer({storage:storage})

        //register routes
        this.app.post('/api/recipes',this.RecipeService.generateRecipe)

    }
}


export default RecipeApi