import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/database/entity/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ global: true, signOptions: { expiresIn: '5m' }, })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
