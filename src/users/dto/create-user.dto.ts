import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Mail@mail.com', required: true })
  readonly email: string;
  @ApiProperty({ example: '123123123', required: true })
  readonly password: string;
}
