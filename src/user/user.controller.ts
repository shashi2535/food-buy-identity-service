import { USER_METHODS } from './../interface/grpc.service.interface';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserCreateDto } from 'src/dto/createUserDto';
import { SERVICES } from 'src/interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @GrpcMethod(SERVICES.USER_SERVICE, USER_METHODS.REGISTER_USER)
  async registerUser(request: UserCreateDto): Promise<any> {
    console.log('in register user service');
    return this.userService.registerUser(request);
  }
}
