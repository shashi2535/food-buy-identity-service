import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from 'src/dto';
import { Role, User, UserRoles } from 'src/model';
import {
  generateOtpForPhone,
  generateOtpOnEmail,
  setInitialResponse,
  setSuccessResponse,
} from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { HttpMessage } from 'src/constant';
import { Sequelize } from 'sequelize';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(UserRoles) private userRoleModel: typeof UserRoles,
    private jwtService: JwtService,
  ) {}
  async registerOwner(request: UserCreateDto) {
    try {
      const { email, name, role } = request;
      const roleData = await this.roleModel.findOne({ where: { name: role } });
      const userData = await this.userModel.findOne({
        where: { email: request?.email },
      });
      if (userData) {
        return {
          status: false,
          message: HttpMessage.USER_ALREADY_EXIST,
        };
      }
      if (request.id) {
        if (!userData) {
          const checkUserData = await this.userModel.findOne({
            where: { id: Number(request.id) },
          });
          if (!checkUserData) {
            return {
              status: false,
              message: HttpMessage.INVALID_ID,
            };
          }
          await this.userModel.update(
            {
              name,
              email,
              isActive: true,
              token: generateOtpOnEmail(6),
              tokenExp: new Date(new Date().getTime() + 10 * 60 * 1000),
            },
            {
              returning: true,
              where: { id: Number(request.id) },
            },
          );
          const updatedUserData = await this.userModel.findOne({
            where: { id: Number(request.id) },
          });
          // HttpMessage.INVALID_ID
          return {
            status: true,
            message: '',
            result: {
              isEmailLogin: true,
              email: updatedUserData.email,
              token: updatedUserData.token,
              name: updatedUserData.name,
            },
          };
        }
      }
      if (!userData) {
        const userCreateData = await this.userModel.create({
          name,
          email,
          isActive: true,
          token: generateOtpOnEmail(6),
          tokenExp: new Date(new Date().getTime() + 10 * 60 * 1000),
        });
        await this.userRoleModel.create({
          userId: userCreateData.id,
          roleId: roleData.id,
        });
        return {
          status: true,
          message: 'user registered successfully',
          result: {
            isEmailLogin: true,
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
      if (request.email) {
        const userData: any = await this.userModel.findOne({
          where: { email },
          raw: true,
        });
        console.log(
          '🚀 ~ file: user.service.ts:110 ~ UserService ~ verifyOtp ~ userData:',
          userData,
        );
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
        const otpExpirationTime = userData?.tokenExp?.getTime();
        if (Number(otpExpirationTime) < new Date()?.getTime()) {
          return {
            status: true,
            message: 'Otp Has Expired.',
          };
        } else {
          const token = await this.jwtService.signAsync({
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
      } else {
        const userData = await this.userModel.findOne({
          where: { phone: request.phone },
          raw: true,
        });
        if (!userData) {
          return {
            status: false,
            message: 'Invalid User',
          };
        }
        if (userData.otp?.trim() !== String(otp)) {
          return {
            status: false,
            message: 'Invalid Otp',
          };
        }
        const otpExpirationTime = userData?.otpExpire?.getTime();
        if ((otpExpirationTime as number) < new Date()?.getTime()) {
          return {
            status: true,
            message: 'Otp Has Expired.',
          };
        } else {
          const token = await this.jwtService.signAsync({
            id: userData.id,
          });
          let response;
          if (userData.email) {
            response = {
              token: token,
            };
          } else {
            response = {
              id: userData.id,
            };
          }
          return {
            status: true,
            message: 'Otp Verified Successfully.',
            result: response,
          };
        }
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
      console.log('request', request);
      if (request.email) {
        const userData = await this.userModel.findOne({
          where: { email: request.email },
          raw: true,
        });
        if (!userData) {
          return {
            status: false,
            message: 'Invalid User',
            result: null,
          };
        }
        await this.userModel.update(
          {
            token: generateOtpOnEmail(6),
            tokenExp: new Date(new Date().getTime() + 10 * 60 * 1000),
          },
          {
            returning: true,
            where: { email: request.email },
          },
        );
        const updatedUserData = await this.userModel.findOne({
          where: { email: request.email },
        });
        return {
          status: true,
          message: 'Otp Send On Email Successfully.',
          result: {
            email: updatedUserData.email,
            token: updatedUserData.token,
            name: updatedUserData.name,
            isEmailLogin: true,
          },
        };
      }
      if (request.phone) {
        console.log('phone>>>');
        const userData = await this.userModel.findOne({
          where: { phone: request.phone },
        });
        if (!userData) {
          return {
            status: false,
            message: 'Invalid User',
            result: null,
          };
        }
        const otp = `${
          process.env.ISOTP === 'true' ? `${generateOtpForPhone()}` : '12345'
        } `;
        await this.userModel.update(
          {
            otp: otp,
            otpExpire: new Date(new Date().getTime() + 10 * 60 * 1000),
          },
          {
            returning: true,
            where: { phone: request.phone },
          },
        );
        const updatedUserData = await this.userModel.findOne({
          where: { phone: request.phone },
        });
        const response =
          process.env.ISOTP === 'false'
            ? {
                phone: updatedUserData.phone,
                otp: updatedUserData.otp,
              }
            : {
                phone: updatedUserData.phone,
                otp: updatedUserData.otp,
                isPhoneLogin: true,
              };
        return {
          status: true,
          message: 'Otp Send On Phone Successfully.',
          result: response,
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
      if (request.email && request.phone) {
        return {
          status: false,
          message: 'Something Went Wrong',
        };
      }
      if (request.email) {
        const userData = await this.userModel.findOne({
          where: { email: request.email },
        });
        if (!userData) {
          return {
            status: false,
            message: 'User Not Exist',
          };
        }
        if (userData) {
          await this.userModel.update(
            {
              token: generateOtpOnEmail(6),
              tokenExp: new Date(new Date().getTime() + 10 * 60 * 1000),
            },
            {
              returning: true,
              where: { email: request.email },
            },
          );
          const updatedUserData = await this.userModel.findOne({
            where: { email: request.email },
          });
          return {
            status: true,
            message: 'Ready To Login.',
            result: {
              email: updatedUserData.email,
              token: updatedUserData.token,
              name: updatedUserData.name,
              isEmailLogin: true,
            },
          };
        }
      }
      if (request.phone) {
        console.log('phone', request);
        console.log('ISOTP', process.env.ISOTP);
        const otp = `${
          process.env.ISOTP === 'true' ? `${generateOtpForPhone()}` : '123456'
        } `;
        const userData = await this.userModel.findOne({
          where: { phone: request.phone },
        });
        const roleData = await this.roleModel.findOne({
          where: { name: request.role },
        });
        if (!userData) {
          const userCreateData = await this.userModel.create({
            phone: request.phone,
            otp: otp,
            otpExpire: new Date(new Date().getTime() + 10 * 60 * 1000),
          });
          await this.userRoleModel.create({
            userId: userCreateData.id,
            roleId: roleData.id,
          });
          const response =
            process.env.ISOTP === 'false'
              ? {
                  phone: userCreateData.phone,
                  otp: userCreateData.otp,
                }
              : {
                  phone: userCreateData.phone,
                  otp: userCreateData.otp,
                  isPhoneLogin: true,
                };
          return {
            status: true,
            message: 'Ok',
            result: response,
          };
        }
        if (userData) {
          const dataObj = userData.email
            ? {
                otp: otp,
                otpExpire: new Date(new Date().getTime() + 10 * 60 * 1000),
                isPhoneExist: true,
              }
            : {
                otp: otp,
                otpExpire: new Date(new Date().getTime() + 10 * 60 * 1000),
              };
          await this.userModel.update(dataObj, {
            returning: true,
            where: { phone: request.phone },
          });
          const updatedUserData = await this.userModel.findOne({
            where: { phone: request.phone },
          });
          const response =
            process.env.ISOTP === 'false'
              ? {
                  phone: updatedUserData.phone,
                  otp: updatedUserData.otp,
                }
              : {
                  phone: updatedUserData.phone,
                  otp: updatedUserData.otp,
                  isPhoneLogin: true,
                };
          return {
            status: true,
            message: 'Ready To Login.',
            result: response,
          };
        }
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

  async verifyToken({ token }: { token: string }) {
    let response = setInitialResponse();
    try {
      const { id } = await this.jwtService.verify(token);
      const userDetails = await this.userModel.findOne({
        where: { id },
        attributes: [
          'email',
          'id',
          'name',
          'phone',
          'isVerified',
          [Sequelize.col('userRoles.id'), 'roleId'],
          [Sequelize.col('userRoles.role.name'), 'role'],
        ],
        include: [
          {
            model: this.userRoleModel,
            attributes: [],
            include: [
              {
                model: this.roleModel,
                attributes: [],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
      if (!userDetails) {
        throw new Error('UnAuthorized');
      }
      response = setSuccessResponse(userDetails);
    } catch (err) {
      console.log('err', err?.message);
      response.message = err?.message;
    }
    return response;
  }
}
