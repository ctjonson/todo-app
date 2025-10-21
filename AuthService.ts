import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Hash a password
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Validate password
  async validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  // Register a user
  async register(username: string, password: string) {
    const passwordHash = await this.hashPassword(password);

    // Check if username exists
    const existingUser = await this.prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const user = await this.prisma.user.create({
      data: { username, passwordHash },
    });
    return user;
  }

  // Login a user and create a JWT
  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user || !(await this.validatePassword(password, user.passwordHash))) {
      throw new Error('Invalid username or password');
    }

    // Generate and return the JWT token
    const payload = { userId: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }
}
