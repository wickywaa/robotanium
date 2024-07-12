import { Injectable } from '@nestjs/common';
import {IEmailConfirmationDto, IForgotPasswordDto, User} from '../interfaces/user.interface';
const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  "81ad727ee0ed92304240d02b04eb10f1",
  "59716f1eafeb6566eecb07a3e0238a39",
);

@Injectable()
export class MailService {

  sendConfirmationLink = async(confirmationDto:IEmailConfirmationDto):Promise<boolean | void> => {

    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'gav@robotanium.com',
            Name: 'Confirm Email',
          },
          To: [
            {
              Email: confirmationDto.email,
              Name: confirmationDto.userName,
            },
          ],
          TextPart: "here is the email link {{var:day:\"monday\"}}",
					HTMLPart: "<h3>click here to confirm your account {{var:emailLink:\"link\"}} </h3>",
          TemplateLanguage: true,
          Subject: 'Confirm Email address',
          Variables: {
            emailLink: `<p><a href="http://robotanium.com/confirmemail?username=${confirmationDto.userName}&email=${confirmationDto.email}&token=${confirmationDto.registrationToken}">Confirmation Link</a></p>`,
            userName: confirmationDto.userName,
          },
        },
      ], 
    })

   const response:Promise<boolean | void> = request
    .then(result => {
      console.log('worked')
      return true
    })
    .catch(err => {
      console.log(err.statusCode)
      return false;
    })

    return response
  }

  sendResetMailPasswordLink = async(forgotPasswordDto: IForgotPasswordDto): Promise<boolean | void> => {
     const request = mailjet.post('send',{version:'v3.1'}).request({
      Messages: [
        {
          From: {
            Email: 'gav@robotanium.com',
            Name: 'Robotanium',
          },
          To: [
            {
              Email: forgotPasswordDto.email,
              Name: forgotPasswordDto.userName,
              token: forgotPasswordDto.token,
            },
          ],
          TextPart: "here is the email link {{var:day:\"monday\"}}",
					HTMLPart: "<h3>click here to confirm your account {{var:emailLink:\"link\"}} </h3>",
          TemplateLanguage: true,
          Subject: 'Reset Password ',
          Variables: {
            emailLink: `<p><a href="http://robotanium.com/resetPassword?username=${forgotPasswordDto.userName}&email=${forgotPasswordDto.email}&token=${forgotPasswordDto.token}">Reset Password Link</a></p>`,
            userName: forgotPasswordDto.userName,
          },
        }
      ]
     })

     const response:Promise<boolean | void> = request
    .then(result => {
      console.log('forgot password sent')
      return true
    })
    .catch(err => {
      console.log(err.statusCode)
      return false;
    })

    return response;
  }

  sendAdminInviteEmail = async(confirmationDto: IEmailConfirmationDto, password:string): Promise<boolean | void> => {
    const request = mailjet.post('send',{version:'v3.1'}).request({
     Messages: [
       {
         From: {
           Email: 'gav@robotanium.com',
           Name: 'Robotanium',
         },
         To: [
           {
             Email: confirmationDto.email,
             Name: confirmationDto.userName,
             token: confirmationDto.registrationToken
           },
         ],
         TextPart: "Your robotanium admin account has been created; your password is {{var:password:\"link\"}} you will need to change your password on first login and you will need to activate your account within 24 hours",
         HTMLPart: "<h3>Your robotanium admin account has been created;</br> your password is{{var:password:\"link\"}} </br> click here to login and change your password {{var:emailLink:\"link\"}} </h3>",
         TemplateLanguage: true,
         Subject: 'Robotanium Admin Account',
         Variables: {
           emailLink: `<p><a href="http://robotanium.com/login?username=${confirmationDto.userName}&email=${confirmationDto.email}&password=${password}&token=${confirmationDto.registrationToken}">Login and Change Password</a></p>`,
           userName: confirmationDto.userName,
           password: password
         },
       }
     ]
    })

    const response:Promise<boolean | void> = request
   .then(result => {
     console.log('Admin Created Email sent')
     return true
   })
   .catch(err => {
     console.log(err.statusCode)
     return false;
   })

   return response;
 } 
}