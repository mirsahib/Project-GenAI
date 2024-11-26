import express,{ Express} from "express"
import UserService from "../service/user.service"

class UserApi{

    private app:Express
    private UserService:UserService

    constructor(app:Express){
        this.app = app
        this.UserService = new UserService()
        
        //register routes
        this.app.get('/api/user',this.UserService.readAll)
        this.app.post('/api/user',this.UserService.create)
        this.app.get('/api/user/:id',this.UserService.readByID)
        this.app.put('/api/user/:id',this.UserService.updateById)
        this.app.delete('/api/user/:id',this.UserService.deleteById)
    }
    
}


export default UserApi