import express,{Express} from 'express'
import cors from 'cors'
// import UserApi from './api/user'
import ProductApi from './src/api/product'
// import AuthApi from './api/auth'
import RecipeApi from './src/api/recipe'

const app = async (app:Express)=>{
    app.use(express.json())
    app.use(cors())
    

    //app router
    // new UserApi(app)
    new ProductApi(app)
    // new AuthApi(app)
    new RecipeApi(app)

}

export default app