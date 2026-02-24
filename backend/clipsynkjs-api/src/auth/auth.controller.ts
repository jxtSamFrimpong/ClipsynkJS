import { Controller, Post, Body, UseGuards, SerializeOptions } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup.dto'
import { LoginUserDto } from './dto/login.dto'
import { UpdatePasswordSubmitNewPassword, UpdatePassWordVerificationCodeDto} from './dto/update-pass.dto'
import { PasswordResetAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SerializeOptions({ groups: ['device:create'] })
  async signup(@Body() signupDto: SignupUserDto) {
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  @SerializeOptions({ groups: ['device:create'] })
  async login(@Body() loginDto: LoginUserDto) {
    return await this.authService.login(loginDto);
  }

  @Post('requestUpdatePassword')
  async requestUpdatePassword(@Body('email') email: string) {
    return await this.authService.requestUpdatePassword(email);
  }

  @Post('verifyForgotPasswordCode')
  async verifyForgotPasswordCode(@Body() updatePasswordVerificationCodeDto: UpdatePassWordVerificationCodeDto) {
    return await this.authService.verifyForgotPasswordCode(updatePasswordVerificationCodeDto);
  }

  @Post('updatePassword')
  @UseGuards(PasswordResetAuthGuard)
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordSubmitNewPassword) {
    return await this.authService.updatePassword(updatePasswordDto);
  }

}
