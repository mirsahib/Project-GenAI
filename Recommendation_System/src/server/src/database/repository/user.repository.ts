import UserModel from "../model/User.model";


export interface IUser {
    email:string,
    password:string
    firstName: string,
    lastName: string
}

class UserRepository {
    
    createUser = async({firstName,lastName,email,password}:IUser)=> {
        const user = await new UserModel({ firstName, lastName ,email,password})
        await user.save()
        return user
    }
    read =async () => {
        const users = await UserModel.findAll()
        return users
    }
    findById =async(id:string)=>{
        const user = await UserModel.findByPk(id)
        return user
    }
    findByEmail = async(email:string)=>{
        const user = await UserModel.findOne({where:{email:email}})
        return user
    }
    updateById=async(id:string,updatedField:Object)=>{
        const user = await UserModel.update(updatedField,{where:{id:id}})
        return user
    }
    deleteById=async(id:string)=>{
        const user = await UserModel.destroy({where:{id:id}})
        return user
    }
}

export default UserRepository