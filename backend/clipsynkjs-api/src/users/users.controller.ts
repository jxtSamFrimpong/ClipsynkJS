import { Controller, Get, Query, Param, Post, Body, Res, HttpCode, HttpStatus, Put, Delete, ParseUUIDPipe, ParseIntPipe, UseFilters, UseInterceptors, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserdto } from './dto/create-user.dto'
import { UpdateUserdto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import type { UUID } from 'crypto';

import { CustomHttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';

import { SkipAuth } from 'src/auth/guards/skip.auth';
import { Public } from 'src/auth/guards/skip.auth';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { appconfig } from 'src/utils/config';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard.jwt';



@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(AuthGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    //GET Users
    @Get()
    @UseFilters(CustomHttpExceptionFilter)
    async getAllUsers() {
        console.log('Fetching all users')
        return await this.usersService.getAll()
    }

    @UseFilters(CustomHttpExceptionFilter)
    @Get(':id')
    async getUser(
        @Param('id', new ParseUUIDPipe()) id: UUID
    ) {
        return await this.usersService.getOne(id)
    }

    @Public()
    @Post()
    async createUser(
        @Body() createUserdto: CreateUserdto
    ) {
        // UsersArray.push(createUserdto)
        // return createUserdto
        return await this.usersService.createUser(createUserdto)
    }

    @Put(':id')
    async updateUser(
        @Param('id', new ParseUUIDPipe()) id: UUID,
        @Body() updateUserDto: UpdateUserdto
    ) {
        return await this.usersService.updateUser(id, updateUserDto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async asyncdeleteUser(
        @Param('id', new ParseUUIDPipe()) id: UUID
    ) {
        return await this.usersService.deleteUser(id)
    }

    @SkipAuth()
    @Post('login')
    async loginUser(
        @Body() loginDto: { email: string; password: string },
        @Res({ passthrough: true }) res: Response
    ) {
        console.debug('Login attempt for email:', loginDto.email);
        const { token } = await this.usersService.loginUser(loginDto.email, loginDto.password);
        res.cookie('access_token', token, {
            httpOnly: true,        // JS cannot read it
            secure: true,          // HTTPS only (set false in dev)
            sameSite: 'strict',    // CSRF protection
            maxAge: Number(appconfig.auth.jwtExpiration.slice(0, appconfig.auth.jwtExpiration.length - 2)) // 15 minutes
        });
        return { message: 'Logged in successfully' };
    }

    @Post('logout')
    async logoutUser(
        @Res({ passthrough: true }) res: Response
    ) {
        res.clearCookie('access_token');
        return { message: 'Logged out successfully' };
    }

}
