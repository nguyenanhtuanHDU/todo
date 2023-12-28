import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) { }

  async use(req: Request, res: Response, next: Function) {
    try {
      const token = (req.headers?.token as string)?.split(' ')[1]
      console.log("🚀 ~ req.headers:", req.headers)
      console.log("🚀 ~ token:", token)
      const data = await this.jwtService.verify(token)
      if (!token) {
        throw new UnauthorizedException('Token is not valid')
      }
      res.locals.data = data;
      next();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token is expired')
      }
      throw new UnauthorizedException()
    }
  }
}
