import * as express from 'express';

import { getUserByEmail, createUser} from '../db/users';
import { random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) =>{
    try {
        const {email, password} = req.body;
        if( !email || !password ){
            console.log('parameter is missing');
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+email, +password, +salt');
        if(!user){
            console.log('user not found');
            return res.sendStatus(400);
        }
        if(user.password != password){
            console.log('password do not match');
            return res.sendStatus(400);
        }
        const salt = random();
        user.salt = salt;
        await user.save();
        res.cookie('AUTO-AUTH-TASK-APP', user.salt);
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const logout = async (req: express.Request, res: express.Response) =>{
    res.cookie('AUTO-AUTH-TASK-APP', '');
    console.log('user logged out')
    return res.status(200).end();
}

export const register = async (req: express.Request, res: express.Response) =>{
    console.log('in register');
    try {
        const { username, email, password } = req.body;
        if( !email || !password || !username){
            console.log('parameter is missing');
            res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        if( existingUser ){
            console.log('user email already exists');
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({email, username, password, salt})
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};