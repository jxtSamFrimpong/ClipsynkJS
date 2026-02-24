import { IsArray, IsBoolean, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";

export class ClipgroupDeviceDto {
    @IsString()
    id: string;
}

export class ClipgroupMemberDto {
    @IsUUID('4')
    id: string;
}

export class ClipgroupOwnerDto {
    @IsUUID()
    id: string;
}

export class CreateClipgroupDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @ValidateNested()
    // @Type(() => ClipgroupOwnerDto)
    // @Transform(({ value }) => typeof value === 'string' ? { id: value } : value)
    owner: ClipgroupOwnerDto;
    // @IsString()
    // owner: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean

    @IsOptional()
    @IsBoolean()
    isDefaultGroup?: boolean;

    @IsOptional()
    //@IsArray()
    @ValidateNested({ each: true })
    // @Type(() => ClipgroupDeviceDto)
    // @Transform(({ value }) => Array.isArray(value) ? value.map((id: string) => ({ id })) : value)
    devices?: ClipgroupDeviceDto[];

    //devices?: string[];

    @IsOptional()
    //@IsArray()
    @ValidateNested({ each: true })
    // @Type(() => ClipgroupMemberDto)
    // @Transform(({ value }) => Array.isArray(value) ? value.map((id: string) => ({ id })) : value)
    groupMembers?: ClipgroupMemberDto[];

    // groupMembers?: string[];
}
