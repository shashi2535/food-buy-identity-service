import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserCreateDto } from 'src/dto/createUserDto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @GrpcMethod('IUserService', 'signup')
  async signup(request: UserCreateDto): Promise<any> {
    return this.userService.Signup(request);
  }
}
