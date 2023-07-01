import { Body, Controller, Post,UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserSchema } from "../users/dto/create-user.dto";
import { AuthService } from './auth.service';
import { JoiValidationPipe } from "../pipes/validation";


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
@UsePipes(new JoiValidationPipe(CreateUserSchema))
  @Post('/register')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
