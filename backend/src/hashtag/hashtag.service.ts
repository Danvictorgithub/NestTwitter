import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HashtagService {
    constructor(private prisma:PrismaClient){}
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
}
