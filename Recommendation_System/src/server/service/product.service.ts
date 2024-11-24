import {  NextFunction, Request, Response } from "express"
import ProductRepository from "../database/repository/product.repository"
import errorMessage from '../util/error-handler'


class ProductService {
    private ProductRepository: ProductRepository

    constructor() {
        this.ProductRepository = new ProductRepository()
    }

    create = async (req: Request, res: Response) => {
        try {
            // const item: ProductModel = req.body
            
            // if(req.file?.path){
            //     item.image = req.file.path
            // }
            // console.log(req.body.image)
            // const product  = await this.ProductRepository.createProduct(item)
            res.json({ message: 'saved successfully'})
        } catch (error) {
            errorMessage(error,res)
        }
    }
    readAll = async (req: Request, res: Response) => {
        try {
            const products = await this.ProductRepository.read()
            res.json({ products })
        } catch (error) {
            errorMessage(error,res)
        }
    }
    readByID=async(req: Request, res: Response) =>{
        try {
            const id = req.params.id
            const product = await this.ProductRepository.readById(id)
            if(product!=null){
                res.json({"product":product})
            }else{
                res.json({"message":"product not found"})
            }
        } catch (error) {
            errorMessage(error,res)
        }

    }
    updateById=async(req: Request, res: Response) =>{
        try {
            const id = req.params.id
            const updatedProduct = await this.ProductRepository.updateById(id,req.body)
            if(updatedProduct!=null){
                res.json({"message":"product updated"})
            }else{
                res.json({"message":"product not found"})
            }
        } catch (error) {
            errorMessage(error,res)
        }
    }
    deleteById=async (req: Request, res: Response) =>{
        try {
            const id = req.params.id
            const deletedProduct = await this.ProductRepository.deleteById(id)
            if(deletedProduct!=null){
                res.json({"message":"product is deleted"})
            }else{
                res.json({"message":"product not found"})
            }
        } catch (error) {
            errorMessage(error,res)
        }
    }

    uploadImage=(req:Request,res:Response,next:NextFunction)=>{
        console.log('middleware')
        console.log(req.file?.path)
        next()
    }

}

export default ProductService