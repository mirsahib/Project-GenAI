import { Express} from "express"
import ProductService from "../service/product.service"
import storage from "../util/cloudinary"
import multer from 'multer'

class ProductApi{

    private app:Express
    private ProductService:ProductService
    private upload:multer.Multer

    constructor(app:Express){
        this.app = app
        this.ProductService = new ProductService
        this.upload = multer({storage:storage})

        //register routes
        this.app.get('/api/product',this.ProductService.readAll)
        this.app.post('/api/product',this.upload.single('image'),this.ProductService.create)
        this.app.get('/api/product:id',this.ProductService.readByID)
        this.app.put('/api/product:id',this.ProductService.updateById)
        this.app.delete('/api/product:id',this.ProductService.deleteById)

    }

    
    
}


export default ProductApi