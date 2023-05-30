import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Interface } from "readline";

export class CreateSignUpDto {
    @ApiProperty()
    @IsString()
    firstName: string;
    @ApiProperty()
    @IsString()
    lastName: string;
    @ApiProperty()
    phone : string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    password: string;
   
      
}