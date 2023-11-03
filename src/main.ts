import { NestFactory } from '@nestjs/core';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        host: 'localhost',
        port: '8000',
        package: 'user',
        url: '0.0.0.0:8000',
        protoPath: 'proto/user.proto',
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
