import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private fileService: FilesService
  ) {}

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
    } catch (err) {
      return err;
    }
  }

  private async generateToken(user: User) {
    try {
      const payLoad = {
        id: user.id,
        firstName: user.first_name,
        email: user.email,
        password: user.password,
      };
      return {
        token: this.jwtService.sign(payLoad),
      };
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(dto: CreateUserDto, file) {
    try {
      const fileName = await this.fileService.createFile(file);
      console.log(fileName);
      return fileName;
    } catch (err) {
      console.error(err);
    }
  }

  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.getUsersByEmail(userDto.email);
      if (candidate) {
        throw new HttpException(
          `Пользователь с email ${userDto.email} - был зарегистрирован`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPass = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPass,
      });
      return this.generateToken(user);
    } catch (err) {
      return err;
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.getUsersByEmail(userDto.email);
      const hashPassword = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && hashPassword) {
        return user;
      }
      throw 'Invalid password';
    } catch (err) {
      throw new UnauthorizedException({ message: 'Invalid-password or email' });
    }
  }
}
