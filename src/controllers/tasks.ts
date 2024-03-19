import * as express from 'express';

import { redisClient } from '../redisClient';

import { getTasks, getTaskById, getTaskByFilter, deleteTaskById, createTask, updateTaskById } from '../db/tasks';

export const createNewTask = async (req: express.Request, res: express.Response) =>{
    try {
        const {id, title, description, dueDate, status, assigneeUserName} = req.body;
        if(!id ||  !title || !description){
            console.log('required parameter is missing');
            return res.sendStatus(400);
        }

        const existingTask = await getTaskById(id);
        if(existingTask){
            console.log('task with same id already exists');
            return res.sendStatus(400);
        }

        const task = await createTask({id, title, description, dueDate, status, assigneeUserName});
        redisClient.set(id, JSON.stringify(task));
        return res.status(200).json(task).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTask = async (req: express.Request, res: express.Response) =>{
    try {
        const {tid} = req.params;
        if(!tid){
            console.log('task id is missing in params');
            return res.sendStatus(400); 
        }

        let existingTask = redisClient.get(tid).then((response =>{
            console.log(response);
            return JSON.parse(response);
        }));
        if (!existingTask) {
            existingTask = getTaskById(tid);
        }
        if(!existingTask){
            console.log('task with this id do not exist');
            return res.sendStatus(400); 
        }

        await deleteTaskById(tid);
        redisClient.del(tid);
        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllTask = async (req: express.Request, res: express.Response) =>{
    try {
        const tasks = await getTasks();
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getFilteredTask = async (req: express.Request, res: express.Response) =>{
    try {
        const { dueDate, assigneeUserName , status} = req.body;
        console.log(`checking ${dueDate} ${assigneeUserName}`);
        const tasks = await getTaskByFilter(dueDate, status, assigneeUserName);
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTask = async (req: express.Request, res: express.Response) =>{
    try {
        const {tid} = req.params;
        const {id, title, description, dueDate, status, assigneeUserName} = req.body;
        if(!tid){
            console.log('task id is missing in params');
            return res.sendStatus(400); 
        }

        if(!id ||  !title || !description){
            console.log('required parameter is missing in updated task');
            return res.sendStatus(400);
        }

        let existingTask = redisClient.get(tid).then((response =>{
            console.log(response);
            return JSON.parse(response);
        }));
        if (!existingTask) {
            existingTask = getTaskById(tid);
        }
        
        if(!existingTask){
            console.log('task with this id do not exist');
            return res.sendStatus(400); 
        }
        await updateTaskById(tid, {id, title, description, dueDate, status, assigneeUserName} );
        getTaskById(tid).then(task => redisClient.set(tid, JSON.stringify(task)));
        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}