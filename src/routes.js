import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ForgotPasswordController from './app/controllers/ForgotPasswordController';
import SessionController from './app/controllers/SessionController';
import ResetPasswordController from './app/controllers/ResetPasswordController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/forgot', ForgotPasswordController.store);

routes.post('/reset', ResetPasswordController.store);

routes.use(authMiddleware);

routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
