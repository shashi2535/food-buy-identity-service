import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserRoles } from './user_role.entity';

@Table({
  tableName: 'roles',
  underscored: true,
  timestamps: true,
})
export class Role extends Model<Role> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @HasMany(() => UserRoles)
  userRoles: UserRoles;
}
