import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
  })
  id: number;
  @Column({
    unique: true,
  })
  email: string;
  @Column
  name: string;
  @Column
  phone: string;
  @Column
  password: string;
  @Column
  otp: string;
  @Column
  token: string;
  @Column({ type: DataType.DATE })
  otpExpire: Date;
  @Column({ type: DataType.DATE })
  tokenExp: Date;
  @Column({ defaultValue: false })
  isVerified: boolean;
  @Column({ defaultValue: true })
  isActive: boolean;
}
