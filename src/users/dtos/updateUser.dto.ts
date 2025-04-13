import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto{
    @IsNumber()
    id: number;

    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsString()
    @Transform(({value}) => value.trim())
    @MinLength(6)
    password?: string;
};