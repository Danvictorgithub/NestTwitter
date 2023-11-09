import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { SupabaseService } from './supabase/supabase.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { HashtagModule } from './hashtag/hashtag.module';

@Module({
  imports: [UserModule, AuthModule, PostModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SupabaseService],
})
export class AppModule {}
