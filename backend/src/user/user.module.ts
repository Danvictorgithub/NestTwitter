import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,JwtService],
  exports: [UserService]
})
export class UserModule {}
