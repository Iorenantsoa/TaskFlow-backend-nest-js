import { ObjectId } from "mongoose" 
import { CardDocument } from "src/card/schema/card.schema"

export class ListDto {
    
    title: string  

    cards : CardDocument[]

    board : ObjectId

}