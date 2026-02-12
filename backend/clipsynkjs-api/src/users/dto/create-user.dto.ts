import { IsInt, IsNotEmpty, IsString, IsUUID, IsEmail, Length } from "class-validator";

import type { UUID } from "crypto";


export class CreateUserdto {
    // @IsUUID()
    // id: UUID

    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string 

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    password: string

    @IsEmail()
    email: string

}