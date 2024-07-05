import { ApiProperty, PartialType } from '@nestjs/swagger';
import {IsNotEmpty, IsString}from "class-validator"

export class UserDto {

    @ApiProperty()  
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()  
    @IsNotEmpty()
    @IsString()
    lastName:string;
    
    @ApiProperty() 
    @IsNotEmpty()
    @IsString()
     email:string;
    
    @ApiProperty() 
    @IsNotEmpty()
    @IsString()
     password:string
}


