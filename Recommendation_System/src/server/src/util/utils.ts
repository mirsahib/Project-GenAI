
import jwt from 'jsonwebtoken'
const generateToken =async (payload:string) => {
    return await jwt.sign({id:payload},'APP_SECRET',{expiresIn:60*60})
}

export default generateToken