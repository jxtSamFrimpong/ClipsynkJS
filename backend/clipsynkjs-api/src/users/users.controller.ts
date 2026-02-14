import { Controller, Get, Query, Param, Post, Body, HttpCode, HttpStatus,  Put, Delete, ParseUUIDPipe, ParseIntPipe, UseFilters, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateUserdto } from './dto/create-user.dto'
import { UpdateUserdto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import type { UUID } from 'crypto';

import { CustomHttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';

import { SkipAuth } from 'src/auth/guards/skip.auth';
import { Public } from 'src/auth/guards/skip.auth';
import { AuthGuard } from 'src/auth/guards/auth.guard';



@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    //GET Users
    @Get()
    @UseFilters(CustomHttpExceptionFilter)
    async getAllUsers(){
        console.log('Fetching all users')  
        return await this.usersService.getAll()
    }

    @UseFilters(CustomHttpExceptionFilter)
    @Get(':id')
    async getUser(
        @Param('id', new ParseUUIDPipe()) id: UUID
    ){
        return await this.usersService.getOne(id)
    }

    @Public()
    @Post()
    async createUser(
        @Body() createUserdto: CreateUserdto
    ){
        // UsersArray.push(createUserdto)
        // return createUserdto
        return await this.usersService.createUser(createUserdto)
    }

    @Put(':id')
    async updateUser(
        @Param('id', new ParseUUIDPipe()) id: UUID,
        @Body() updateUserDto: UpdateUserdto
    ){
        return await this.usersService.updateUser(id, updateUserDto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async asyncdeleteUser(
        @Param('id', new ParseUUIDPipe()) id: UUID
    ){
        return await this.usersService.deleteUser(id)
    }

    @SkipAuth()
    @Post('login')
    async loginUser(
        @Body() loginDto: { email: string; password: string }
    ){
        console.debug('Login attempt for email:', loginDto.email);
        const userToken = await this.usersService.loginUser(loginDto.email, loginDto.password);
        return userToken;
    }

}
