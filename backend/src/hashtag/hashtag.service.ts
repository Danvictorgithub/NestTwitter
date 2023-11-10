import { Injectable } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HashtagService {
  constructor(private prisma:PrismaService){}

    findHashtags(content:string) {
        const hashtags = content.match(/#[a-zA-Z0-9]+/g);
        return Array.from(new Set(hashtags));
      }
    async create(hashtags:Array<string>,postId:number) {
        let resultCount = 0;
        await Promise.all(
            hashtags.map(async (hashtag) => {
                await this.prisma.hashtag.upsert({
                    where: { name: hashtag },
                    update: { posts: { 
                        disconnect: { id: postId },
                        connect: { id: postId } 
                    }  },
                    create: { name: hashtag, posts: { connect: { id: postId } } },
                });
                resultCount += 1;
            })
        );
        return resultCount;
    }
  // create(createHashtagDto: CreateHashtagDto) {
  //   return 'This action adds a new hashtag';
  // }

  async findAll() {
    return await this.prisma.hashtag.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.hashtag.findUnique({
      where:{ id: id },
      include: {
        posts: true
      },
    }); 
  }

  // update(id: number, updateHashtagDto: UpdateHashtagDto) {
  //   return `This action updates a #${id} hashtag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} hashtag`;
  // }
}
