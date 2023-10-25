import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
