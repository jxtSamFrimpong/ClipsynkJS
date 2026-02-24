import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDeviceDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    userId: string;

    @IsString()
    @IsNotEmpty()
    fingerprint: string;

    @IsOptional()
    @IsBoolean()
    isPrimary: boolean;


    @IsOptional()
    platformInfo: Record<string, any>;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;


}
