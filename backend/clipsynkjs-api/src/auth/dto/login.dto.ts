import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: 'Password is too weak. Must contain at least one uppercase, one lowercase, one number, and one special character.',
    })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(100, { message: 'Password must not exceed 100 characters' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
