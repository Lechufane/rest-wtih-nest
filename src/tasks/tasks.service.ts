import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {

    constructor(@InjectModel('Task') private taskModel: Model<Task>){}

    findAll(){
        return this.taskModel.find()
    }

    async findOne(id:string){
        return this.taskModel.findById(id)
    }

    async create(task:CreateTaskDto){
        const newTask = new this.taskModel(task)
        newTask.save()

        return newTask
    }

    async update(id:string, task:UpdateTaskDto){
        return this.taskModel.findByIdAndUpdate(id, task, {new:true})   
    }

    async delete(id:string){
        return this.taskModel.findByIdAndDelete(id)
    }

}
