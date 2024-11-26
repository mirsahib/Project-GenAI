import { Response } from "express"
export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    }
}

const errorMessage = (error: any, res: Response) => {
    let statusCode = 500;
    let message = "Unknown error occurred";

    if (error instanceof CustomError) {
        statusCode = error.statusCode;
        message = error.message;
    } else if (error instanceof Error) {
        message = error.message;
    }

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export default errorMessage