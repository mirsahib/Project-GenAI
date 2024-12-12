import { DataTypes, Model } from "sequelize";
import PostgresService from "../PostgresService";

const sequelize = PostgresService.getInstance().getConnection()

class Recipe extends Model {
    declare id: string
    declare recipe_name: string
    declare ingredients: string
    declare total_time: number
    declare cuisine: string
    declare instructions: string
    declare url: string
    declare image_url: string
    declare ingredient_count: number
    declare product_name: string
    declare product_name_vector: string
}


Recipe.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    recipe_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    total_time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ingredient_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    product_name_vector: {
        type: 'VECTOR(300)',
        allowNull: false 
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Recipe' // We need to choose the model name
})

Recipe.sync().then(() => console.log('Recipe table created if not exists')).catch(error => {
    console.log('Failed to create Recipe table', error)
})

export default Recipe 