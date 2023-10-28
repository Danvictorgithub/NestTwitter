import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({where:{username:createUserDto.username}});
    if (userExists) {
      throw new BadRequestException('user already exist');
    }
    return await this.prisma.user.create({data:createUserDto});
  }

  async findAll():Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({where:{id}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
