import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import { JwtService } from 'src/jwt/jwt.service';
import { SupabaseService } from 'src/supabase/supabase.service';
// import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma:PrismaService, 
    private jwtService:JwtService,
    private supabase:SupabaseService) { }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({where:{username:createUserDto.username}});
    if (userExists) {
      throw new BadRequestException({message:['user already exist']});
    }
    bcrypt.hash(createUserDto.password,parseInt(process.env.SECRET_KEY), async (err,hash)=>{
      if (err) {
        throw new HttpException(err,500);
      }
      createUserDto.password = hash;
      await this.prisma.user.create({data:{...createUserDto,name:createUserDto.username}});
    })
    return {message:[`Successfully created user ${createUserDto.username}`]};
  }

  async findAll():Promise<{username:String,name:String,createdAt:Date}[]> {
    return await this.prisma.user.findMany({select:{username:true,name:true,createdAt:true}});
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({where:{id},select:{username:true,name:true,createdAt:true}})
  }

  async update(
    id: number, 
    updateUserDto: UpdateUserDto, 
    BearerToken:string,
    files:{userProfile?: Express.Multer.File[],userCover?:Express.Multer.File[]}) {
    const token = BearerToken.split(' ')[1];
    const UserObj:any = this.jwtService.decode(token);
    const UserId = UserObj.id;
    // Checks for user profile and user cover

    (files.userProfile !== undefined) ? updateUserDto.userProfile = await this.supabase.uploadFile(files.userProfile[0]) : null;
    (files.userCover  !== undefined) ? updateUserDto.userCover = await this.supabase.uploadFile(files.userCover[0]) : null;
    
    const userExists = await this.prisma.user.findFirst({where:{username:updateUserDto.username}});
    if (userExists) {
      throw new BadRequestException({message:['user already exist']});
    }

    if (id !== UserId) {
      throw new UnauthorizedException('You are not authorized to update this user');
    }
    const user = await this.prisma.user.update({
      data: updateUserDto,
      where: { id }
    });
    return {message:`Successfully updated user ${UserId}`};
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
  
  // non REST operations
  async findOneByUsername(username:string) {
    return await this.prisma.user.findUnique({where:{username}});
  }
}
