import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, ValidationPipe, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file:Express.Multer.File, 
    @Body(new ValidationPipe) createPostDto: CreatePostDto,
    @Headers('Authorization') BearerToken:string) {
    return this.postService.create(createPostDto,BearerToken,file);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('image'))
  createReply(
    @UploadedFile() file:Express.Multer.File, 
    @Body(new ValidationPipe) createPostDto: CreatePostDto,
    @Headers('Authorization') BearerToken:string,
    @Param('id') id:string) {
    return this.postService.createReply(createPostDto,BearerToken,file,id);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get()
  findAllPostByUser(@Param('id') id:number) {
    return this.postService.findAllPostByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
