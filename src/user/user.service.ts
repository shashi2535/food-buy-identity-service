import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from 'src/dto';
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
      // const userData = await this.userModel.create({});

      return {
        status: true,
        message: 'message',
        result: null,
      };
    } catch (err) {
      return {
        statusCode: 500,
        message: err.message,
        result: {},
      };
    }
  }
}
