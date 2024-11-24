import ProductModel from "../model/Product.model";


class ProductRepository {
    
    createProduct = async({product_name,price,brand,img_url}:ProductModel)=> {
        const product = await new ProductModel({ product_name, price,brand ,img_url})
        await product.save()
        return product
    }
    read =async () => {
        const products = await ProductModel.findAll()
        return products
    }
    readById =async(id:string)=>{
        const product = await ProductModel.findByPk(id)
        return product
    }
    updateById=async(id:string,updatedField:Object)=>{
        const product = await ProductModel.update(updatedField,{where:{id:id}})
        return product
    }
    deleteById=async(id:string)=>{
        const product = await ProductModel.destroy({where:{id:id}})
        return product
    }
}

export default ProductRepository