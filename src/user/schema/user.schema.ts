import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Timestamp } from "Generics/Timestamp"
import   mongoose, { HydratedDocument } from "mongoose" 
import { BoardDocument } from "src/board/schema/board.schema"


export type UserDocument = HydratedDocument<User>

@Schema()
export class User extends Timestamp {

    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ type: [{type : mongoose.Schema.Types.ObjectId , ref : 'Board'}]})
    boards: BoardDocument[]

}

export const userSchema = SchemaFactory.createForClass(User)
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
 