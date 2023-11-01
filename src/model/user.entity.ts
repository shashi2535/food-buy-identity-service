import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { UserRoles } from './user_role.entity';

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
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
  otp: string;

  @Column
  token: string;

  @Column({ type: DataType.DATE })
  otpExpire: Date;

  @Column({ type: DataType.DATE })
  tokenExp: Date;

  @Column({ defaultValue: false })
  isVerified: boolean;

  @Column({ defaultValue: false })
  isPhoneExist: boolean;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @HasMany(() => UserRoles)
  userRoles: UserRoles[];
}
