import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Module({
  controllers: [PostController],
  providers: [PostService,PrismaService,HashtagService,JwtService,SupabaseService],
})
export class PostModule {}
