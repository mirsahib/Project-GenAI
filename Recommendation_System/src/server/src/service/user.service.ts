import { Request, Response } from "express"
import UserRepository, { IUser } from "../database/repository/user.repository"
import generateToken from "../util/utils"


class UserService {
    private UserRepository: UserRepository

    constructor() {
        this.UserRepository = new UserRepository()
    }

    create = async (req: Request, res: Response) => {
        try {
            const { firstName, lastName,email,password }: IUser = req.body
            const user = await this.UserRepository.createUser({ firstName, lastName ,email,password})
            const token = await generateToken(user.id)
            res.json({ id: user.id,token:token })
        } catch (error) {
            let message = 'Unknow error'
            if(error instanceof Error){
                message= error.message
            }
            res.json({ error: message })
        }
    }
    readAll = async (req: Request, res: Response) => {
        try {
            const users = await this.UserRepository.read()
            res.json({ 'Users': users })
        } catch (error) {
            res.json({ "error": error })
        }
    }
    readByID=async(req: Request, res: Response) =>{
        try {
            const id = req.params.id
            const user = await this.UserRepository.findById(id)
            if(user!=null){
                res.json({"user":user})
            }else{
                res.json({"message":"user not found"})
            }
        } catch (error) {
            res.json({"error":error})
        }

    }
    updateById=async(req: Request, res: Response) =>{
        try {
            const id = req.params.id
            const updatedUser = await this.UserRepository.updateById(id,req.body)
            if(updatedUser!=null){
                res.json({"message":"user updated"})
            }else{
                res.json({"message":"user not found"})
            }
        } catch (error) {
            res.json({"error":error})
        }
    }
    deleteById=async (req: Request, res: Response) =>{
        try {
            const id = req.params.id
            const deletedUser = await this.UserRepository.deleteById(id)
            if(deletedUser!=null){
                res.json({"message":"user is deleted"})
            }else{
                res.json({"message":"user not found"})
            }
        } catch (error) {
            res.json({"error":error})
        }
    }

}

export default UserService