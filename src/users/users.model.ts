import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email: string;
  password: string;
  file: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ example: 'Ivan', description: 'User first Name' })
  @Column({ type: DataType.STRING, defaultValue: 'example' })
  first_name: string;

  @ApiProperty({ example: 'Petrov', description: 'User Last Name' })
  @Column({ type: DataType.STRING, defaultValue: 'example' })
  last_name: string;

  @ApiProperty({ example: '19.05.1999', description: 'Birthday day' })
  @Column({ type: DataType.DATE, allowNull: true })
  birthday: number;

  @ApiProperty({ example: '89999999999', description: 'User PhoneNumber' })
  @Column({ type: DataType.STRING, allowNull: true })
  number: string;

  @ApiProperty({ example: 'Maxim@mail.com', description: 'User email' })
  @Column({ type: DataType.STRING })
  email: string;

  @ApiProperty({ example: 'asdadasd', description: 'User Password' })
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({ example: 'example', description: 'User first Name' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  post_id: string;

  @ApiProperty({ example: 'example', description: 'User first Name' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  event_id: string;

  @ApiProperty({ example: 'example', description: 'User first Name' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  university_id: string;

  @ApiProperty({ example: 'example', description: 'User first Name' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  file: string;
}
