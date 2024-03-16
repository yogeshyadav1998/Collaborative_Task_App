import * as express from 'express';
import { merge} from 'lodash';

import { getUserBySalt } from '../db/users';


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try {
        const sessionSalt = req.cookies['AUTO-AUTH-TASK-APP'];

        if(!sessionSalt){
            console.log('user not authenticated');
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySalt(sessionSalt);

        if(!sessionSalt){
            console.log('session user not exist anymore');
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});
        return next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}
