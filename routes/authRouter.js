import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { userSignupSchema, userSigninSchema } from '../schemas/usersSchema.js';
import authController from '../controllers/authController.js';
import authenticate from '../middlewares/authenticate.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  authController.register
);

authRouter.post('/login', validateBody(userSigninSchema), authController.login);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.logout);

export default authRouter;
