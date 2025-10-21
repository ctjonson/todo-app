import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body() body: { title: string }) {
        return this.todoService.create({ title: body.title });
    }

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: { title?: string; completed?: boolean }) {
        return this.todoService.update(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(Number(id));
    }
}
