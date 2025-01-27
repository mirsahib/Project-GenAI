import express,{Express} from 'express'
import expressApp from './express'
const server = async()=>{
    const app:Express = express()
    await expressApp(app)

    app.listen(process.env.TRENDY_PORT||8080,()=>{
        console.log('Server is running at',process.env.TRENDY_PORT)
    })
} 

server()