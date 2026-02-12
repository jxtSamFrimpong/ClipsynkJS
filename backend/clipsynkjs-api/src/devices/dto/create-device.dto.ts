import { IsOptional } from "class-validator";

export class CreateDeviceDto {
    id: string;
    name: string;

    @IsOptional()
    userId: string;

    fingerpring: string;

    @IsOptional()
    osType: string;


    @IsOptional()
    platformInfo: Record<string, any>;


}
