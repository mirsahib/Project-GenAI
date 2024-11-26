import { NextFunction, Request, Response } from "express"
import ProductRepository from "../database/repository/product.repository"
import errorMessage, { CustomError } from '../util/error-handler'


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
            res.json({ message: 'saved successfully' })
        } catch (error) {
            errorMessage(error, res)
        }
    }
    readAll = async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const searchText = req.query.searchText as string

            const filters = req.query.filters ? JSON.parse(req.query.filters as string) : undefined;
            Object.keys(req.query).forEach((key) => {
                if (!["page", "limit", "searchText"].includes(key)) {
                    filters[key] = req.query[key] as string;
                }
            });

            const { count, products } = await this.ProductRepository.read(page, limit, searchText, filters);
            res.json({
                code: 200, metaData: {
                    currentPage: page,
                    totalCount: count,
                    totalPages: Math.ceil(count / limit),
                    limit: limit
                }, data: products
            })
        } catch (error) {
            errorMessage(error, res)
        }
    }
    readByID = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            console.log("🚀 ~ ProductService ~ readByID= ~ id:", id)
            if (!id) {
                throw new CustomError("Invalid id parameter", 400);
            }

            const product = await this.ProductRepository.readById(id)
            if (!product) {
                throw new CustomError("Product not found", 404);
            }
            res.status(200).json({
                success: true,
                data: product
            });

        } catch (error) {
            errorMessage(error, res)
        }

    }
    updateById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            if (!id) {
                throw new CustomError("Invalid id parameter", 400);
            }
            const product = await this.ProductRepository.updateById(id, req.body)
            if (!product) {
                throw new CustomError("Product not found", 404);
            }
            res.json({ "message": "product updated" })
        } catch (error) {
            errorMessage(error, res)
        }
    }
    deleteById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const product = await this.ProductRepository.deleteById(id)
            if (!product) {
                throw new CustomError("Product not found", 404);
            }
        } catch (error) {
            errorMessage(error, res)
        }
    }

    uploadImage = (req: Request, res: Response, next: NextFunction) => {
        console.log('middleware')
        console.log(req.file?.path)
        next()
    }

}

export default ProductService