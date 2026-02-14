import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup.dto'
import { LoginUserDto } from './dto/login.dto'
import { UsersService } from 'src/users/users.service';
import { DevicesService } from 'src/devices/devices.service';
import { ClipgroupService } from 'src/clipgroup/clipgroup.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly deviceService: DevicesService,
    private readonly clipgroupService: ClipgroupService
  ){

  }

  async signup(signupDto: SignupUserDto) {
    let user: any;
    let device: any;
    let defaultClipgroup: any;

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
          }
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
    return `This action returns all auth`;
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
