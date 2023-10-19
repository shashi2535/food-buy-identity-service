import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        host: 'localhost',
        port: '50050',
        package: 'user',
        url: '0.0.0.0:50050',
        protoPath: join(__dirname, '../src/proto/user.proto'),
        loaders: {
          enums: String,
          objects: true,
          arrays: true,
          keepCase: true,
        },
      },
    } as GrpcOptions,
  );
  app.listen();
}
bootstrap();
