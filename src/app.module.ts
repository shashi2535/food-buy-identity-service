import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './constant';
import { AppController } from './app.controller';
import { Role, User, UserRoles } from './model';
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.host,
      port: Number(config.port),
      username: config.userName,
      password: config.password,
      database: config.database,
      models: [User, Role, UserRoles],
      logging: false,
      timezone: '+00:00',
      autoLoadModels: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
