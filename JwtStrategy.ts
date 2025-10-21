import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Token will be rejected if expired
      secretOrKey: process.env.JWT_SECRET, // Use secret key
    });
  }

  // Validate the JWT payload
  async validate(payload: { userId: number; username: string }) {
    return { userId: payload.userId, username: payload.username };
  }
}
