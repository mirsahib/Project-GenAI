import { DataTypes, Model } from "sequelize";
import PostgresService from "../PostgresService";

const sequelize = PostgresService.getInstance().getConnection()

class Product extends Model {
    declare id: string
    declare product_name: string
    declare brand: string
    declare discount_price: number
    declare price: number
    declare img_url: string
    declare quantity: string
    declare category: string
    declare sub_category: string
    declare absolute_url: string
}

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    product_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discount_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    img_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    absolute_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Product' // We need to choose the model name
})

Product.sync().then(() => console.log('Product table has been successfully created, if one doesn\'t exist')).catch(error => {
    console.log('Failed to create Product table', error)
})

export default Product