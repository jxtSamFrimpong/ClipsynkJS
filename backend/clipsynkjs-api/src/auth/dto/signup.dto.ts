import { IsOptional, IsString, IsEmail, IsNotEmpty, ValidateNested, IsEnum } from "class-validator";
import { Type } from "class-transformer";

export enum ipType {
    IPv4 = 'IPv4',
    IPv6 = 'IPv6'
}

export class DeviceInfoDto {
    @IsString()
    @IsNotEmpty()
    fingerprint: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    macAddress: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    ip: string;

    @IsOptional()
    @IsEnum(ipType)
    @IsNotEmpty()
    ipType: ipType;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    os: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    osVersion: string;

    @IsOptional()
    platformInfo: Record<string, any>; //device metadata like model, manufacturer, etc
}

export class SignupUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @ValidateNested()
    @Type(() => DeviceInfoDto)
    @IsNotEmpty()
    device: DeviceInfoDto;

}