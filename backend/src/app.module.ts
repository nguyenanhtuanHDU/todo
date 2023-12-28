import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenMiddleware } from './token.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_URL),
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      // secret: process.env.KEY_JWT,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '3600s' },
    }),
    WinstonModule.forRoot({}),
    //   ServeStaticModule.forRoot({
    //     serveRoot: '/public',
    //     rootPath: join(__dirname, '..', 'public'),
    //  }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 2,
      }
    ]),
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    // .apply(TokenMiddleware)
    // .exclude(
    //   { path: 'auth', method: RequestMethod.ALL },
    //   'auth/(.*)',
    // )
    // .forRoutes("*")
  }
}
