import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HashtagController],
  providers: [PrismaService,HashtagService],
  exports:[HashtagService]
})
export class HashtagModule {}
