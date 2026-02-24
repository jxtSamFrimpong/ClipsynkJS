import { IsOptional, IsString, IsEmail, IsNotEmpty, ValidateNested, IsEnum, Matches, MinLength, MaxLength} from "class-validator";
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
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: 'Password is too weak. Must contain at least one uppercase, one lowercase, one number, and one special character.',
        })
        @MinLength(8, { message: 'Password must be at least 8 characters long' })
        @MaxLength(100, { message: 'Password must not exceed 100 characters' })
        @IsString()
        @IsNotEmpty()
    password: string;

    @ValidateNested()
    @Type(() => DeviceInfoDto)
    @IsNotEmpty()
    device: DeviceInfoDto;

}