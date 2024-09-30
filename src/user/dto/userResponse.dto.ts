import { UserDocument } from "../schema/user.schema"

export class UserResponseDto {

    success : boolean 
    message : string 
    user : UserDocument | null
}