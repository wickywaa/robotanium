import { Body, Controller, Get, Inject, Injectable, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IUserMethods, User, UserModel, ILoginCredentials, IEmailConfirmationDto, IForgotPasswordDto, IChangePassword, ICreateAdminUser } from '../interfaces';
import { Model } from 'mongoose';
import { MailService } from '../services';
var generator = require('generate-password');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

@Injectable()
@Controller('api/admin')

export class AdminUsersController {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User, UserModel, IUserMethods>,
    private mailService: MailService,
  ) { }

  @Post('user')
  async createAdminuser(@Body()body: ICreateAdminUser, @Res()response: Response) {

    const password = generator.generate({
      length: 16,
      numbers: true,
      uppercase: true,
      symbols: true,
      strict: true
    });
      
    const newUser: User = {
      password: password,
      userName: body.userName,
      email: body.email,
      isRobotaniumAdmin: false,
      isPlayerAdmin: false,
      authTokens: [],
      isActive: true,
      isEmailVerified: true,
      registrationToken: null,
      passwordResetToken: null,
      changePassword: true,
      imgsrc: '',
      theme:'dark',
      rememberme:false,
    }

    try {

      const user  = new this.userModel(newUser);
      await user.save();

      const emailConfirmationDto = await user.generateConfirmEmailDto();
      const mailsent = await this.mailService.sendAdminInviteEmail(emailConfirmationDto, password);

      if (!mailsent) {
        console.log(mailsent)
        throw new Error('Unable to send email');
      }

      return response.status(201).send();

    } catch(e) {
      console.log(e)
      return response.status(500).send({ message: e.message });
    }
  }

  @Post('login')
  async adminLogin(@Body() body: ILoginCredentials, @Res() response: Response) {
    const { email, password } = body;

    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return response.status(401).send();
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch || !user.isRobotaniumAdmin) {
        return response.status(401).send();
      }
      const token = await user.generateAuthToken();
      const userProfile = await user.getPublicProfile();

      return response.status(201).send({
        user: userProfile,
        token,
      })

    }
    catch (e) {
      return response.status(500).send({
        error: {
          message: e.message,
        }
      })
    }

  }

  @Post('changepassword')
  async changePassword(@Body() body: IChangePassword, @Res() response: Response) {
    const { oldPassword, newPassword } = body;

    try {
      const user = await this.userModel.findOne({ email:body.user.email });
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) return response.status(401).send({ error: { message: 'Password does not match' } });
      user.password = newPassword;
      await user.save();

      response.status(200).send({ message: 'hello' });

    } catch (e) {
      return response.status(500).send({ error: { message: e.message } })
    }
  }


  @Get('admin/user/{id}')
  async getUserById(@Body() body: { user: User }, @Res() response: Response) {
    response.status(200).send({ message: 'hello' });
  }

}