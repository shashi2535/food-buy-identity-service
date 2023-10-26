import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from 'src/dto';
import { Role, User, User_Role } from 'src/model';
import { generateOtpOnEmail } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(User_Role) private user_roleModel: typeof User_Role,
    private jwtService: JwtService,
  ) {}
  async registerOwner(request: UserCreateDto) {
    try {
      console.log('register');
      const { email, name, role } = request;
      const roleData = await this.roleModel.findOne({ where: { name: role } });
      const userData = await this.userModel.findOne({
        where: { email: request.email },
      });
      if (userData) {
        return {
          status: false,
          message: 'User Already Exist',
        };
      }
      if (!userData) {
        const userCreateData = await this.userModel.create({
          name,
          email,
          isActive: true,
          token: generateOtpOnEmail(6),
          tokenExp: new Date(new Date().getTime() + 10 * 60 * 1000),
        });
        await this.user_roleModel.create({
          user_id: userCreateData.id,
          role_id: roleData.id,
        });
        return {
          status: true,
          message: 'user registered successfully',
          result: {
            email: userCreateData.email,
            token: userCreateData.token,
            name: userCreateData.name,
          },
        };
      }
    } catch (err) {
      console.log('err', err);
      return {
        status: false,
        message: err.message,
        result: null,
      };
    }
  }
  async verifyOtp(request: any) {
    try {
      const { email, otp } = request;
      const userData = await this.userModel.findOne({
        where: { email },
      });
      if (!userData) {
        return {
          status: false,
          message: 'Invalid User',
        };
      }
      if (userData.token !== String(otp)) {
        return {
          status: false,
          message: 'Invalid Otp',
        };
      }
      const otpExpirationTime = userData?.dataValues?.tokenExp?.getTime();
      if ((otpExpirationTime as number) < new Date()?.getTime()) {
        return {
          status: true,
          message: 'Otp Has Expired.',
        };
      } else {
        const token = await this.jwtService.signAsync({
          email: userData.email,
          id: userData.id,
        });
        return {
          status: true,
          message: 'Otp Verified Successfully.',
          result: {
            token: token,
          },
        };
      }
    } catch (err) {
      console.log('err', err);
      return {
        status: false,
        message: err.message,
        result: null,
      };
    }
  }
  async resendOtp(request: any) {
    try {
      const { email, type } = request;
      const userData = await this.userModel.findOne({ where: { email } });
      if (!userData) {
        return {
          status: false,
          message: 'Invalid User',
          result: null,
        };
      }
      if (type === 'email') {
        await this.userModel.update(
          {
            token: generateOtpOnEmail(6),
            tokenExp: new Date(new Date().getTime() + 10 * 60 * 1000),
          },
          {
            returning: true,
            where: { email },
          },
        );
        const updatedUserData = await this.userModel.findOne({
          where: { email },
        });
        return {
          status: true,
          message: 'Otp Send On Email Successfully.',
          result: {
            email: updatedUserData.email,
            token: updatedUserData.token,
            name: updatedUserData.name,
          },
        };
      }
    } catch (err) {
      console.log('err', err);
      return {
        status: false,
        message: err.message,
        result: null,
      };
    }
  }
  async loginOwner(request: any) {
    try {
      console.log('in login owner function', request);
      return {
        status: true,
        message: 'OK',
      };
    } catch (err) {
      console.log('err', err);
      return {
        status: false,
        message: err.message,
        result: null,
      };
    }
  }
}
