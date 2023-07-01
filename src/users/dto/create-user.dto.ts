import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";

export class CreateUserDto {
  @ApiProperty({ example: "Ivan", required: true })
  readonly first_name: string;
  @ApiProperty({ example: "Petrov", required: true })
  readonly last_name: string;
  @ApiProperty({ example: "Mail@mail.com", required: true })
  readonly email: string;
  @ApiProperty({ example: "2023-01-01", required: true })
  readonly birthday: string;
  @ApiProperty({ example: "8123456789", required: false })
  readonly number: number;
  @ApiProperty({ example: "123123123", required: true })
  readonly password: string;
}

export const CreateUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  birthday: Joi.string().required(),
  number: Joi.number().allow(null),
  password: Joi.string().required().min(6)
});
