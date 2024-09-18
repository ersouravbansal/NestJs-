import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Ravi Kumar',
      email: 'ravi.kumar@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Sonia Verma',
      email: 'sonia.verma@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Amit Singh',
      email: 'amit.singh@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      email: 'vikram.mehta@example.com',
      role: 'ADMIN',
    },
  ];
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role not Found');
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found!');
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
