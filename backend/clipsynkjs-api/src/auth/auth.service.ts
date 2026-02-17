import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup.dto'
import { LoginUserDto } from './dto/login.dto'
import { UsersService } from 'src/users/users.service';
import { DevicesService } from 'src/devices/devices.service';
import { ClipgroupService } from 'src/clipgroup/clipgroup.service';
import { MailService } from 'src/utils/mail.service';

import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { appconfig } from '../utils/config';

import { UpdatePasswordSubmitNewPassword, UpdatePassWordVerificationCodeDto} from './dto/update-pass.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly deviceService: DevicesService,
    private readonly clipgroupService: ClipgroupService,
    private mailService: MailService,
    @InjectRedis() private readonly redisService: Redis
  ){

  }

  async signup(signupDto: SignupUserDto) {
    let user: any;
    let device: any;
    let defaultClipgroup: any;

    //TODO: we should wrap this whole process in a transaction to ensure atomicity and data integrity. If any step fails, we can roll back the entire transaction to maintain a consistent state in the database.
    //TODO: we should also consider adding more robust error handling and logging to help diagnose issues during the signup process.
    //TODO: we should also consider implementing retry logic for transient errors, such as network issues or temporary database unavailability, to improve the resilience of the signup process.
    //TODO: we should also consider adding validation and sanitization of the input data to prevent potential security vulnerabilities, such as SQL injection or cross-site scripting (XSS) attacks.
    try {
      //create user
      try {
        const {name: username, email, password } = signupDto
        user = await this .userService.createUser({ email, password, name: username,})
        if (!user){
          throw new Error('Error creating user')
        }
      }
      catch(err){
        console.error('Error creating user:', err);
        throw err; 
      }

      //create defalt user device
      try {
        const { fingerprint, macAddress, ip, os, osVersion, platformInfo, name: deviceName} = signupDto.device
        device = await this.deviceService.create({
          fingerprint: fingerprint,
          userId: user.id,
          name: deviceName,
          isPrimary: true,
          platformInfo: {
            macAddress,
            ip,
            os,
            osVersion,
            ...platformInfo
          },
          isActive: true
        })
        if (!device){
          throw new Error('Error creating device')
        }
      }
      catch(err){
        console.error('Error creating device:', err);
        //rollback user creation if device creation fails
        await this.userService.deleteUser(user.id)
        throw err; 
      }


      //create default clipgroup for user
      try {
            defaultClipgroup = await this.clipgroupService.create({
              name: `${user.id} Default Clipgroup`,
              description: `Default clipgroup for ${user.name}`,
              owner: { id: user.id},
              devices: [{ id:device.id}],
              isDefaultGroup: true,
              isActive: true,
              isPublic: false,
              groupMembers: [{ id: user.id}]     
            })
          if (!defaultClipgroup){
            throw new Error('Error creating default clipgroup')
          }
      

        return {
          user,
          device,
          defaultClipgroup
        }
      }
      catch(err){
        console.error('Error creating default clipgroup:', err);
        //rollback user and device creation if clipgroup creation fails
        await this.deviceService.remove(device.id)
        await this.userService.deleteUser(user.id)
        throw err; 
      }
    }
    catch (error){
      console.error('Error during signup:', error);
      throw error; 
    }
  }

  async login(loginDto: LoginUserDto) {
    return await this.userService.loginUser(loginDto.email, loginDto.password, loginDto.deviceFingerprint)
  }


  async requestUpdatePassword(email: string){
    try {
        if (!email){
        throw new Error('Email is required')
      }
      const user = await this.userService.getOneByMail(email)
      if (!user){
        throw new Error('User not found')
      }

      // 1. Generate secure 6-digit code
      const otp = crypto.randomInt(100000, 1000000).toString();

      // 2. Store in Redis (Key: 'otp:user@email.com', Value: '123456')
      // EX 300 sets expiry to 5 minutes
      await this.redisService.set(`otp:${email}`, otp, 'EX', 300);

      // 3. Send via Nodemailer (your existing logic)
      await this.mailService.sendUserConfirmation(email, user.name, otp);
      
      return { message: 'OTP sent successfully', user: user.id };
    }
    catch(err){
      console.error('Error during requestUpdatePassword:', err);
      throw err; 
    }
  }

  async verifyForgotPasswordCode(updatePasswordVerificationCodeDto: UpdatePassWordVerificationCodeDto){
    try {
      const user = await this.userService.getOne(updatePasswordVerificationCodeDto.id)
      if (!user){
        throw new Error('User not found')
      }

      //code must exist and still ve valid on redis
      const otp = await this.redisService.get(`otp:${user.email}`);
      if (!otp){
        throw new Error('OTP not found')
      }
      if (otp !== updatePasswordVerificationCodeDto.updatePasswordCode){
        throw new Error('OTP does not match')
      }


      const payload = { 
        user: user.id, 
        scope: 'password_reset',
        // Using a slice of the hash keeps the token invalid once the password changes
        version: user.passwordHash.slice(-10) 
      };

      const secretKey = appconfig.auth.jwtSecret;
      const accessToken = jwt.sign(payload, secretKey, { expiresIn: '15m', algorithm: 'HS256', issuer: 'clipsynk-js' }); //TODO: use appconfig for the token options and make sure to set appropriate expiration time, algorithm, and issuer for the tokens to improve security
      return {
          token: accessToken
      }
    }
    catch (err){
      console.error('Error during verifyForgotPasswordCode:', err);
      throw err; 
    }

    
  }

  async updatePassword(updatePasswordDto: UpdatePasswordSubmitNewPassword){
    try {
      //user.hashPassword(updatePasswordDto.password) 
      console.log('about to update password',  updatePasswordDto)
      return await this.userService.updateUser(updatePasswordDto.id, { password: updatePasswordDto.password})

    }
    catch(err){
      console.error('Error during updatePassword:', err)
      throw err;
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
