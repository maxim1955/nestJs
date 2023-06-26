import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller(`users`)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  findOne() {
    return this.userService.findOne('Rihanna');
  }

  @Delete()
  deleteUser() {
    return this.userService.deleteUser(14);
  }
}
