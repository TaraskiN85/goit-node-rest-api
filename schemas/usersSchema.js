import Joi from 'joi';
import { emailRegExp } from '../constants/user-constants.js';

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});
