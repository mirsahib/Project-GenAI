import { DataTypes, Model } from "sequelize";
import PostgresService from "../PostgresService";

const sequelize = PostgresService.getInstance().getConnection()

class User extends Model {
    declare id:string
    declare firstName:string
    declare lastName:string
    declare password:string
    declare email:string
 }

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, 
        unique: true,
        primaryKey: true,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    password:{
        type:DataTypes.STRING
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
})

// User.sync().catch(error => {
//     console.log('Failed to create user table', error)
// })

export default User