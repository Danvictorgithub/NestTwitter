import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/jwt/jwt.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private jwtService:JwtService,
    private supabase:SupabaseService,
    private hashtagService:HashtagService,
    ) { }

  async create(createPostDto: CreatePostDto,BearerToken:string,file) {
    // const token = BearerToken.split(' ')[1];
    // const UserObj:any = this.jwtService.decode(token);
    // if (file !== undefined) {
    //   createPostDto.image = await this.supabase.uploadFile(file);
    // }
    // const post = await this.prisma.post.create({data:{...createPostDto,author:{connect:{id:UserObj.id}}}});
    // const hashtags = this.hashtagService.findHashtags(post.content);
    // console.log(hashtags);
    // const numOfHashtags = await this.hashtagService.create(hashtags,post.id);
    // return {...post,count:numOfHashtags};

    return await this.prisma.hashtag.findMany({
      include: {
        posts: true
      },
    });
    
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

  findOne(id: number,BearerToken:string) {
    const token = BearerToken.split(' ')[1];
    const UserObj:any = this.jwtService.decode(token);
    
    return this.prisma.post.findUnique({where:{id}});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
