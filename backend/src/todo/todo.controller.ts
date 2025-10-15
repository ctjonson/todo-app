import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    getAll() {
        return this.todoService.getAll();
    }

    @Post()
    create(@Body('title') title: string) {
        return this.todoService.create(title);
    }
}
