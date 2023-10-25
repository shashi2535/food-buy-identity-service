import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user_roles',
  underscored: true,
  timestamps: true,
})
export class User_Role extends Model<User_Role> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column
  user_id: number;
  @Column
  role_id: number;
  @Column({ type: DataType.DATE })
  createdAt: Date;
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
