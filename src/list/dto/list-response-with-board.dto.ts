import { BoardDocument } from "src/board/schema/board.schema"

export interface ListResponseWithBoard{
    success  :  boolean 
    message : string
    list : any 
    board : BoardDocument
} 