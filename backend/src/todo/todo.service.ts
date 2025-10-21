import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    create(data: Prisma.TodoCreateInput) {
        return this.prisma.todo.create({ data });
    }

    findAll() {
        return this.prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
    }

    update(id: number, data: Prisma.TodoUpdateInput) {
        return this.prisma.todo.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.prisma.todo.delete({ where: { id } });
    }
}
