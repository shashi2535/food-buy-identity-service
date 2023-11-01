import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from './role.entity';
import { User } from './user.entity';
@Table({
  tableName: 'user_roles',
  underscored: true,
  timestamps: true,
})
export class UserRoles extends Model<UserRoles> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => Role)
  role: Role;
}
