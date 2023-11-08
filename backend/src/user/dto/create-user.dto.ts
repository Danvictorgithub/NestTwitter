import {IsAlphanumeric, IsStrongPassword, Length, Matches} from "class-validator";

export class CreateUserDto {
    @Length(4,15)
    username:string;
    
    @Length(8,64)
    @IsStrongPassword()
    password:string;
}
