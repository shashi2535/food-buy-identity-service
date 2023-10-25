import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, Role, User_Role } from '../model';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'src/constant';
@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, User_Role]),
    JwtModule.register({
      global: true,
      secret: config.JWT.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}
