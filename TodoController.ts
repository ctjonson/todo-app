import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
@UseGuards(AuthGuard('jwt')) // Protect all routes in this controller
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body() body: { title: string }) {
    return this.todoService.create({ title: body.title });
  }
}
