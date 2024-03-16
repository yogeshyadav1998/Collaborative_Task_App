import * as express from 'express';

import { register, login, logout } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/logout', isAuthenticated, logout);
};