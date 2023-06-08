import { Body, ConflictException, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() filterQuery:unknown){
        return await this.taskService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string){
        return await this.taskService.findOne(id);
    }
    
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() task: CreateTaskDto){

        try{

            if(!task.title){
                throw new Error('Title is required');
            }
           
            const createdTask = await this.taskService.create(task);
            return createdTask;

        } catch (error){

            if(error.code === 11000){
                throw new ConflictException('Task already exists');
            }

            throw new Error(error);
        }
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() task: UpdateTaskDto){
        return await this.taskService.update(id, task);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string){

        const task = await this.taskService.findOne(id);

        if(!task) throw new NotFoundException('Task not found');

        return await this.taskService.delete(task.id);

    }
}
