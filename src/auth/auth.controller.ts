import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserSchema } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../pipes/validation';
import { User } from '../users/users.model';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('upload')
  @ApiOperation({ summary: 'Добавление фото нового пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() userDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.updateUser(userDto, file);
  }
}
