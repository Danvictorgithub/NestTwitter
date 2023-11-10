import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('hashtag')
@UseGuards(JwtAuthGuard)
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  // @Post()
  // create(@Body() createHashtagDto: CreateHashtagDto) {
  //   return this.hashtagService.create(createHashtagDto);
  // }

  @Get()
  findAll() {
    return this.hashtagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hashtagService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
  //   return this.hashtagService.update(+id, updateHashtagDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.hashtagService.remove(+id);
  // }
}
