import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    getAll() {
        return this.prisma.todo.findMany();
    }

    create(title: string) {
        return this.prisma.todo.create({ data: { title } });
    }
}
