import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/jwt/jwt.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService,private jwtService:JwtService,private supabase:SupabaseService) { }
  async create(createPostDto: CreatePostDto,BearerToken:string,file) {
    const token = BearerToken.split(' ')[1];
    const UserObj:any = this.jwtService.decode(token);
    if (file !== undefined) {
      createPostDto.image = await this.supabase.uploadFile(file);
    }
    const post = await this.prisma.post.create({data:{...createPostDto,author:{connect:{id:UserObj.id}}}});
    return post;
  }
  async createReply(createPostDto: CreatePostDto,BearerToken:string,file,id:string) {
    const token = BearerToken.split(' ')[1];
    const UserObj:any = this.jwtService.decode(token);
    if (file !== undefined) {
      createPostDto.image = await this.supabase.uploadFile(file);
    }
    const post = await this.prisma.post.create({data:{...createPostDto,commentTo:{connect:{id:parseInt(id)}},author:{connect:{id:UserObj.id}}}});
    return post;
  }

  async findAll() {
    return await this.prisma.post.findMany({include:{commentBy:true}});
  }
  async findAllPostByUser(id:number) {
    return await this.prisma.post.findMany({where:{authorId:id}});
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({where:{id}});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
