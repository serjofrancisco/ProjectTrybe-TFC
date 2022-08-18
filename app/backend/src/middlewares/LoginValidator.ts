import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError';

const blankField = 'All fields must be filled';
const invalidEmail = 'Invalid email';
const passwordLength = 'Password must be at least 6 characters long';
export default class LoginValidator {
  static validate(req: Request, _res: Response, next: NextFunction) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required().empty()
        .messages({
          'any.required': blankField, 'string.empty': blankField, 'string.email': invalidEmail,
        }),
      password: Joi.string().required().min(6).empty()
        .messages({
          'any.required': blankField, 'string.empty': blankField, 'string.min': passwordLength,
        }),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }

    return next();
  }
}
