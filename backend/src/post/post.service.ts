import { Injectable, NotFoundException } from '@nestjs/common';
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
    const token = BearerToken.split(' ')[1];
    const UserObj:any = this.jwtService.decode(token);
    if (file !== undefined) {
      createPostDto.image = await this.supabase.uploadFile(file);
    }
    const post = await this.prisma.post.create({data:{...createPostDto,author:{connect:{id:UserObj.id}}}});
    const hashtags = this.hashtagService.findHashtags(post.content);
    const numOfHashtags = await this.hashtagService.create(hashtags,post.id);
    return {...post,count:numOfHashtags};    
  }

  async createReply(createPostDto: CreatePostDto,BearerToken:string,file,id:string) {
    const token = BearerToken.split(' ')[1];
    const UserObj:any = this.jwtService.decode(token);
    if (file !== undefined) {
      createPostDto.image = await this.supabase.uploadFile(file);
    }
    const post = await this.prisma.post.create({data:{...createPostDto,commentTo:{connect:{id:parseInt(id)}},author:{connect:{id:UserObj.id}}}});
    const hashtags = this.hashtagService.findHashtags(post.content);
    const numOfHashtags = await this.hashtagService.create(hashtags,post.id);

    return {...post,count:{numOfHashtags}};
  }

  async findAll() {
    return await this.prisma.post.findMany({include:{commentBy:true}});
  }
  async findOne(id: number) {
    const idAuthor = await this.prisma.post.findUnique({
      where:{id},
      select:{authorId:true}
    });
    const post = await this.prisma.post.findUnique({
      where:{id},
      include:{
        author:{
          select:{
            id:true,
            username:true,
            name:true,
            userProfile:true
          }
        },
        commentTo:{
          include:{
            author:{select:{
              id:true,
              username:true,
              name:true,
              userProfile:true 
            }}
          }
        },
        commentBy:{
          include: {
            author:{
              select: {
                id:true,
                username:true,
                name:true,
                userProfile:true
              },
            },
            commentBy:{
              where:{authorId:idAuthor.authorId}
            },
            _count:{select:{views:true,likedBy:true,commentBy:true}},
          }
        },
        _count:{select:{views:true,likedBy:true,commentBy:true}}
      },
    });
    
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
