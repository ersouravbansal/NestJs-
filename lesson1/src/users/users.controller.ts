import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // GET /users or /users?role=value1&age=value2
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    // return [];
    return this.usersService.findAll(role);
  }
  //   @Get('interns') //GET /interns
  //   findAllInterns() {
  //     return [];
  //   }
  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    // return { id };
    return this.usersService.findOne(id);
  }
  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    // return user;
    return this.usersService.create(createUserDto);
  }
  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    // return { id, ...userUpdate };
    return this.usersService.update(id, updateUserDto);
  }
  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    // return { id };
    return this.usersService.delete(id);
  }
}
