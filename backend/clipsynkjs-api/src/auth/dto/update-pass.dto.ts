import { IsString, Matches, MinLength, MaxLength, IsNotEmpty, IsEmail, isNotEmpty} from 'class-validator';

export class UpdatePassWordVerificationCodeDto  {
    @MaxLength(6)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    updatePasswordCode: string;
    

    @IsNotEmpty()
    @IsString()
    id: string;
}

export class UpdatePasswordSubmitNewPassword {
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
                message: 'Password is too weak. Must contain at least one uppercase, one lowercase, one number, and one special character.',
            })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(100, { message: 'Password must not exceed 100 characters' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    id: string;
}
