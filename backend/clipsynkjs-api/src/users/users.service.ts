import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserdto } from './dto/create-user.dto';
import { UpdateUserdto } from './dto/updateUser.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user/user';
import { Device } from 'src/devices/entities/device.entity';
import { appconfig } from '../utils/config';
import { DevicesService } from 'src/devices/devices.service';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly deviceService: DevicesService,
    ){}  

    async getAll(): Promise<Partial<User>[]> {
        try {
            return await this.userRepository.find({})
        }
        catch (error){
            console.error('Error fetching users:', error);
            throw error; // Rethrow the error to be handled by the controller
        }
    }

    async getOne(id: string){
        

        try {
            const user = await this.userRepository.findOneBy({id})
            if (!user){
                throw new NotFoundException(`User ${id} doesnt exist`)
            }
            return user
        }
        catch (error){
            console.error('Error fetching user:', error);
            throw error; // Rethrow the error to be handled by the controller
        }
    }


    async getOneByMail(email: string){
        

        try {
            const user = await this.userRepository.findOneBy({email})
            if (!user){
                throw new NotFoundException(`User ${email} doesnt exist`)
            }
            return user
        }
        catch (error){
            console.error('Error fetching user:', error);
            throw error; // Rethrow the error to be handled by the controller
        }
    }


    async createUser(payload: CreateUserdto): Promise<User> {
        try {
            const userObject = this.userRepository.create(payload)
            const lastSeen = new Date()
            Object.assign(userObject, {lastSeen, passwordHash: payload.password})
            const user = await this.userRepository.save(userObject)
            return user
        }
        catch (error){
            console.error('Error creating user:', error);
            throw error; // Rethrow the error to be handled by the controller
        }
    }

    async updateUser(id: string, payload: UpdateUserdto): Promise<User>{

        try {

            const user = await this.userRepository.findOneBy({id})
            if (!user){
                throw new NotFoundException(`User ${id} doesnt exist`)
            }
            const  { password: passwordHash, ...restOfPayload } = payload
            const userToUpdateObject = {
                ...restOfPayload,
                ...(passwordHash ? { passwordHash } : {}) // Only include passwordHash if it's provided in the payload
            }
            const updatedUserObj = Object.assign(user, userToUpdateObject)
            const updatedUser  = await this.userRepository.save(updatedUserObj)
            return updatedUser;
            
        }
        catch (error){
            console.error('Error updating user:', error);
            throw error; // Rethrow the error to be handled by the controller
        }
    }

    async deleteUser(id: string): Promise<{message: string, user: User}> {
        
        try {
            const user = await this.userRepository.findOneBy({id})
            if (!user){
                throw new NotFoundException(`User ${id} doesnt exist`)
            }
            await this.userRepository.delete(id)
            return {
                message: 'deleted',
                user
            }
        }catch (error){
            console.error('Error deleting user:', error);
            throw error; // Rethrow the error to be handled by the controller
        }
    }

    async loginUser(email: string, password: string, fingerprint?: string | null): Promise<{ token: string }> {
        try {
            const user = await this.userRepository.findOneBy({email})
            if (!user){
                throw new NotFoundException(`User ${email} doesnt exist`)
            }
            if (!(await user.validatePassword(password))){
                throw new UnauthorizedException('Invalid credentials');
            }
            //if its a new device, add it as an inactive device
            if (fingerprint){
                const device = user.devices.find(device => device.deviceFingerprint === fingerprint)
                if (!device){
                    //add new inactive device
                    const newDevice = await this.deviceService.create({
                        fingerprint: fingerprint,
                        name: `${user.name} ${fingerprint}`,
                        userId: user.id,
                        isActive: false,
                        isPrimary: false,
                        platformInfo: {}  
                    })
                    //TODO: add checks to confirm device creation was successful
                }

                }
            const payload = { id: user.id, email: user.email };
            // const accessToken = this.jwtService.sign(payload);
            const secretKey = appconfig.auth.jwtSecret; //TODO: move to a central config file and make sure to use a strong secret key in production, we should also consider using a different secret key for different environments (e.g., development, staging, production) to improve security
            if (!secretKey){
                throw new Error('JWT_SECRET environment variable is not set');
            }
            const accessToken = jwt.sign(payload, secretKey, { expiresIn: '1h', algorithm: 'HS256', issuer: 'clipsynk-js' }); //TODO: use appconfig for the token options and make sure to set appropriate expiration time, algorithm, and issuer for the tokens to improve security
            return {
                token: accessToken
            }
            //TODO - should be login from one of user's devices
            //TODO - implement tokendto and use it as the return type for this function, we should also include the users id and email in the token so that we can use it for authentication and authorization in the future. We should also consider adding a refresh token mechanism to allow users to refresh their tokens without having to log in again. We should also consider adding a token blacklist mechanism to allow users to log out and invalidate their tokens. We should also consider adding a token expiration mechanism to automatically expire tokens after a certain period of time to improve security. We should also consider adding a token rotation mechanism to rotate tokens after a certain period of time to improve security.
            //TODO - we should also update the users last seen to now on login, but we should do that in a way that doesnt cause performance issues. We can either do it in a background job or we can do it in the same request but we should make sure that it doesnt cause performance issues. We can also consider only updating the last seen if the user has been inactive for a certain period of time (e.g., 1 hour) to reduce the number of updates to the database.
        }catch (error){
            console.error('Error logging in user:', error);
            throw error; // Rethrow the error to be handled by the controller
        }
    }
}
