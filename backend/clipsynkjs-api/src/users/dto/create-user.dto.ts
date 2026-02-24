import { IsInt, IsNotEmpty, IsString, IsUUID, IsEmail, Length } from "class-validator";


export class CreateUserdto {

    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string 

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string

}