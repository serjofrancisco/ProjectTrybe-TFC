import { NextFunction, Request, Response } from 'express';
import CustomError from './CustomError';

class ErrorHandler {
  defaultStatus: number;

  constructor(defaultStatus = 500) { this.defaultStatus = defaultStatus; }

  handle(error: Error, req:Request, res:Response, _next:NextFunction) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(this.defaultStatus).json({ message: error.message });
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
