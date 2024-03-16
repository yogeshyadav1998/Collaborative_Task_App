import * as express from 'express';

import { createNewTask, deleteTask, getAllTask, getFilteredTask, updateTask } from '../controllers/tasks';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/task/createTask', isAuthenticated, createNewTask);
    router.get('/task/deleteTask/:tid', isAuthenticated, deleteTask);
    router.get('/tasks', isAuthenticated, getAllTask);
    router.post('/filteredTasks', isAuthenticated, getFilteredTask);
    router.post('/task/update/:tid', isAuthenticated, updateTask);
};