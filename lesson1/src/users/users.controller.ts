import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
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
  findOne(@Param('id') id: string) {
    // return { id };
    return this.usersService.findOne(+id);
  }
  @Post() // POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    // return user;
    return this.usersService.create(user);
  }
  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    // return { id, ...userUpdate };
    return this.usersService.update(+id, userUpdate);
  }
  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    // return { id };
    return this.usersService.delete(+id);
  }
}
