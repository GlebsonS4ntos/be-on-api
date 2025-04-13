import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)   
    name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(6)
    password: string;
}