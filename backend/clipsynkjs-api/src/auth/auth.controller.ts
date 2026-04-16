import { Controller, Post, Get, Body, UseGuards, SerializeOptions, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup.dto'
import { LoginUserDto } from './dto/login.dto'
import { UpdatePasswordSubmitNewPassword, UpdatePassWordVerificationCodeDto } from './dto/update-pass.dto'
import { PasswordResetAuthGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './guards/auth.guard.jwt';
import { appconfig } from 'src/utils/config';

// Converts a JWT expiration string (e.g. '1h', '15m', '7d') to milliseconds
// for use as the cookie maxAge option.
function parseExpirationMs(exp: string): number {
  const value = parseInt(exp.slice(0, -1), 10);
  const unit = exp.slice(-1);
  const ms: Record<string, number> = { s: 1_000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return value * (ms[unit] ?? 1_000);
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @SerializeOptions({ groups: ['device:create'] })
  async signup(
    @Body() signupDto: SignupUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // return await this.authService.signup(signupDto);
    const { token } = await this.authService.signup(signupDto);
    res.cookie('access_token', token, {
      httpOnly: true,        // JS cannot read it
      secure: appconfig.env === "prod",          // HTTPS only (set false in dev)
      sameSite: 'strict',    // CSRF protection
      maxAge: parseExpirationMs(appconfig.auth.jwtExpiration)
    })
  }

  @Post('login')
  @SerializeOptions({ groups: ['device:create'] })
  async login(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token } = await this.authService.login(loginDto);
    res.cookie('access_token', token, {
      httpOnly: true,        // JS cannot read it
      secure: false,          // HTTPS only (set false in dev)
      sameSite: 'strict',    // CSRF protection
      maxAge: parseExpirationMs(appconfig.auth.jwtExpiration) // 15 minutes
    });
    return { message: 'Logged in successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request) {
    return await this.authService.getMe((req as any).user);
  }

  @Post('logout')
  async logoutUser(
    @Res({ passthrough: true }) res: Response
  ) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
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
