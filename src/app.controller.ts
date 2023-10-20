import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { SERVICES, USER_METHODS } from './interface';

@Controller()
export class AppController {
  @GrpcMethod(SERVICES.USER_SERVICE, USER_METHODS.CHECK_HEALTH)
  checkHealth() {
    return {
      message: SERVICES.USER_SERVICE,
      status: true,
    };
  }
}
