import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './constant';
import { AppController } from './app.controller';
import { Role, User, User_Role } from './model';
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.dev' : `.env.${ENV}`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.host,
      port: Number(config.port),
      username: config.userName,
      password: config.password,
      database: config.database,
      models: [User, Role, User_Role],
      logging: false,
      timezone: '+00:00',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
