import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.DATE })
  bithday: number;

  @Column({ type: DataType.STRING })
  number: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  post_id: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  event_id: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  university_id: string;
}
