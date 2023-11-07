import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Headers, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(new ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor(
    [
      {name:'userProfile', maxCount: 1},
      {name:'userCover', maxCount: 1},
    ]
  ))
  update(
    @UploadedFiles() files:{userProfile?: Express.Multer.File[],userCover?:Express.Multer.File[]}, 
    @Param('id') id: string, @Body() updateUserDto: UpdateUserDto, 
    @Headers('Authorization') BearerToken:string) {
    return this.userService.update(+id, updateUserDto,BearerToken,files);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
