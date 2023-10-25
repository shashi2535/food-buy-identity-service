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
  async registerOwner(request: UserCreateDto): Promise<any> {
    return this.userService.registerOwner(request);
  }
  @GrpcMethod(SERVICES.USER_SERVICE, USER_METHODS.VERIFY_OTP)
  async verifyOtp(request: any): Promise<any> {
    return this.userService.verifyOtp(request);
  }
  @GrpcMethod(SERVICES.USER_SERVICE, USER_METHODS.RESEND_OTP)
  async resendOtp(request: any): Promise<any> {
    return this.userService.resendOtp(request);
  }
  @GrpcMethod(SERVICES.USER_SERVICE, USER_METHODS.LOGIN_OWNER)
  async loginOwner(request: any): Promise<any> {
    return this.userService.loginOwner(request);
  }
}
