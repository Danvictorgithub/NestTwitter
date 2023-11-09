import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { PrismaClient } from '@prisma/client';

@Module({
    providers:[HashtagService,PrismaClient],
    exports:[HashtagService]
})
export class HashtagModule {}