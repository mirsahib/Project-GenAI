import express,{ Express} from "express"
import AuthService from "../service/auth.service"

class AuthApi{

    private app:Express
    private AuthService:AuthService

    constructor(app:Express){
        this.app = app
        this.AuthService = new AuthService()
        
        //register routes
        this.app.post('/api/auth',this.AuthService.signIn)
        
    }

    
    
}


export default AuthApi