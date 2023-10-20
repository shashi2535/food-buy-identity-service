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
  async registerUser(request: UserCreateDto) {
    try {
      console.log('registerUser function', request);
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
        result: {},
      };
    }
  }
}
