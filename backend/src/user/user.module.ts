import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
    controllers: [UserController],
    // providers: [{
    //     provide: "USER_SERVICE",
    //     useValue: UserService
    // }],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
