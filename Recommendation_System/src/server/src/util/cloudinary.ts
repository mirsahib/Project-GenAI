import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


cloudinary.config({
    cloud_name: "dfdmsw4lg",
    api_key: "117463879357159",
    api_secret: "VHN7mjO5KDXvFiI07Tr-zqF2Ijc",
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req:any,file:any)=>{
        return{
            folder:'project-trendy'
        }
    }
})
export default storage
