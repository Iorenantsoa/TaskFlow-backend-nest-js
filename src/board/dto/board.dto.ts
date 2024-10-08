import { ListDocument } from "src/list/schema/list.schema"
import { UserDocument } from "src/user/schema/user.schema"

export class BoardDto {

    name : string

    lists : ListDocument[]
 
    users : UserDocument[]
}