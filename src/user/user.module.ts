import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { JwtStrategy } from './strategy/jwt.strategy';

dotenv.config()

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: userSchema }]),
        PassportModule,
      JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '60s' },
      }),
  ],
  controllers: [UserController],
  providers: [UserService , JwtStrategy]
})
export class UserModule { }
