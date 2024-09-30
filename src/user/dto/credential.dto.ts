import {  IsNotEmpty} from "class-validator"

export class CredentialDto {
    @IsNotEmpty()
    username: string
  
    @IsNotEmpty()
    password: string
}