import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { join } from 'path';
import { GMAIL_ACCOUNT, GMAIL_PASSWORD } from './config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: GMAIL_ACCOUNT,
          pass: GMAIL_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, 'emailTemplates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // This makes it available to other modules
})
export class MailModule {}