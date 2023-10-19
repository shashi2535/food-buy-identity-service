import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto, userLoginDto } from 'src/dto/createUserDto';
import { User } from 'src/model';
// import { v4 as uuid } from 'uuid';
// import { hash, genSalt } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async Signup(request: UserCreateDto) {
    try {
      console.log('singup function', request);
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
        result: {},
      };
    }
  }
  async login(request: userLoginDto) {
    try {
      console.log('in login function', request);
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
      };
    }
  }
}
