import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Timestamp } from "Generics/Timestamp"
import mongoose, { HydratedDocument } from "mongoose"
import { Board } from "src/board/schema/board.schema"
import { Card } from "src/card/schema/card.schema"


export  type ListDocument = HydratedDocument<List>

 
@Schema({timestamps : true})
export class List extends Timestamp {

    @Prop({required : true}) 
    title : string 

    @Prop( {type : [{type : mongoose.Schema.Types.ObjectId, ref: 'Card' }]})
    cards  : Card[]

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : 'Board'})
    board : Board
}

export const ListSchema = SchemaFactory.createForClass(List) 

ListSchema.pre('save', function (next) {
    this.updatedAt = new Date();  
    next();
});