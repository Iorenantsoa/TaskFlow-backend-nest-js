import { Types } from "mongoose"

export class CardDto {
    
    title: string
    
    description: string
 
    etiquette: string

    list: Types.ObjectId 

    date: Date
    
    // checkList: string
}