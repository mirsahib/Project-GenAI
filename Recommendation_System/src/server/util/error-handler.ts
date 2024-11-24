import { Response } from "express"

const errorMessage = (error:any,res:Response) => {
    let message = 'Unknow error'
    if (error instanceof Error) {
        message = error.message
    }
    res.json({ error: message })
}

export default errorMessage