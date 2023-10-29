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

  async findAll():Promise<{username:String,name:String,createdAt:Date}[]> {
    return await this.prisma.user.findMany({select:{username:true,name:true,createdAt:true}});
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({where:{id}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findFirst({where:{id}});
    if (user) {
      await this.prisma.user.delete({where:{id}});
      return {message:`Successfully removed user #${id}`};
    }
    else {
      return {message:`user #${id} does not exist`}
    }
  }
}
