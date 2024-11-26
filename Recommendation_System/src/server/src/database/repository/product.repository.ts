import { Op } from "sequelize";
import ProductModel from "../model/Product.model";


class ProductRepository {

    createProduct = async ({ product_name, price, brand, img_url }: ProductModel) => {
        const product = await new ProductModel({ product_name, price, brand, img_url })
        await product.save()
        return product
    }
    read = async (page: number, limit: number, searchText?: string, filters?: Array<Record<string, string[]>>
    ) => {
        const validAttributes = Object.keys(ProductModel.getAttributes());
        const whereCondition: any = {};

        if (searchText) {
            whereCondition.product_name = {
                [Op.iLike]: `%${searchText}%`
            }
        }

        if (filters && Array.isArray(filters)) {
            filters.forEach((filter) => {
                for (const [column, values] of Object.entries(filter)) {
                    if (validAttributes.includes(column) && Array.isArray(values)) {
                        whereCondition[column] = {
                            [Op.in]: values, // Use IN operator for array values
                        };
                    }
                }
            });
        }

        const { count, rows } = await ProductModel.findAndCountAll({
            where: whereCondition,
            offset: (page - 1) * limit,
            limit: limit
        })
        return { count, products: rows }
    }
    readById = async (id: string) => {
        const product = await ProductModel.findByPk(id)
        return product
    }
    updateById = async (id: string, updatedField: Object) => {
        const product = await ProductModel.update(updatedField, { where: { id: id } })
        return product
    }
    deleteById = async (id: string) => {
        const product = await ProductModel.destroy({ where: { id: id } })
        return product
    }
}

export default ProductRepository