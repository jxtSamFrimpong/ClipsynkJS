import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendUserConfirmation(email: string, name: string, otp: string) {
    const url = `example.com/auth/confirm?otp=${otp}`;

    await this.mailer.sendMail({
      to: email,
      subject: 'Confirmation',
      template: './updatePasswordOTP', 
      context: { name, otpCode: otp, url },
    });
  }
}