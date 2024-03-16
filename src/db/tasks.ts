import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    assigneeUserName: {
        type: String,
        required: false
    }
})

export const TaskModel = mongoose.model('Task', taskSchema);

export const getTasks = () => TaskModel.find();
export const getTaskById = (id: String) => TaskModel.findOne({id});
export const getTaskByFilter = (dueDate?: Date, status?: String, assigneeUserName?: String) =>{
    let tasks = TaskModel.find()
    if(dueDate){
        tasks = tasks.find({"dueDate": dueDate});
    }
    if(status){
        tasks = tasks.find({"status": status});
    }
    if(assigneeUserName){
        tasks = tasks.find({"assigneeUserName": assigneeUserName});
    }
    return tasks;
}
export const createTask = (values: Record<string, any>) => new TaskModel(values).save().then((task) => { return task.toObject()});
export const deleteTaskById = (id: String) => TaskModel.findOneAndDelete({id});
export const updateTaskById = (id: String, values: Record<string, any>) => TaskModel.findOneAndReplace({"id": id}, values );