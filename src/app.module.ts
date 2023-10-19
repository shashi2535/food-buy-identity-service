import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './constant';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.host,
      port: Number(config.port),
      username: config.userName,
      password: config.password,
      database: config.database,
      models: [],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
