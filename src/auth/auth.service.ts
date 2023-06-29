import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async login(userDto: CreateUserDto) {
    console.log(userDto);
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    console.log(user);
    const payLoad = {
      id: user.id,
      firstName: user.first_name,
      email: user.email,
      password: user.password
    };
    console.log(`payload: ${payLoad}`);
    return {
      token: this.jwtService.sign(payLoad)
    };
  }

  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.getUsersByEmail(userDto.email);
      if (candidate) {
        throw new HttpException(
          `Пользователь с email -  + был зарегистрирован`,
          HttpStatus.BAD_REQUEST
        );
      }
      const hashPass = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPass
      });
      return this.generateToken(user);
    } catch (err) {
      console.log(err);
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.getUsersByEmail(userDto.email);
      const hashPassword = await bcrypt.compare(
        userDto.password,
        user.password
      );
      if (user && hashPassword) {
        return user;
      }
      throw new UnauthorizedException({ message: "Invalid password" });
    } catch (err) {
      console.log(err);
    }
  }
}
