import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  //Создание пользователя
  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create({ ...dto });
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  //Получение всех пользователей
  async getAll() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  //Получение пользователя по id
  async findOne(first_name: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          first_name,
        },
      });
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }

  //Удаление пользователя по id
  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.destroy({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getUsersByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        include: { all: true },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
