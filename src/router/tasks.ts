import * as express from 'express';

import { createNewTask, deleteTask, getAllTask, getFilteredTask, updateTask } from '../controllers/tasks';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/task', isAuthenticated, createNewTask);
    router.delete('/task/:tid', isAuthenticated, deleteTask);
    router.get('/task', isAuthenticated, getAllTask);
    router.patch('/filterTasks', isAuthenticated, getFilteredTask);
    router.put('/task/:tid', isAuthenticated, updateTask);
};