import { Schema, Prop  , SchemaFactory} from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

import { Timestamp } from "Generics/Timestamp"
import { List } from 'src/list/schema/list.schema'
import { UserDocument } from 'src/user/schema/user.schema'

export type BoardDocument = HydratedDocument<Board>


@Schema({ timestamps: true })
export class Board  extends Timestamp {

    @Prop({ required: true })
    name: string

    @Prop({ type: [{type : mongoose.Schema.Types.ObjectId , ref : 'List'}]})
    lists: List[]
    
    @Prop({ type: [{type : mongoose.Schema.Types.ObjectId , ref : 'User'}]})
    users  : UserDocument[]
}

export const boardSchema = SchemaFactory.createForClass(Board)

boardSchema.pre('save', function (next) {
    this.updatedAt = new Date();  
    next();
}); 