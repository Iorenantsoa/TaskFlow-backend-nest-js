import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument,  } from 'mongoose'
import { EtiquetteEnum } from '../enum/etiquettes.enum';
import { Timestamp } from 'Generics/Timestamp';
import { List } from 'src/list/schema/list.schema';

export type CardDocument = HydratedDocument<Card>

@Schema({ timestamps: true })
export class Card extends Timestamp {

    @Prop({required : true})
    title: string

    @Prop()
    description: string

    @Prop({enum: EtiquetteEnum, required: false })
    etiquette: string

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : 'List'})
    list: List

    @Prop()
    date: Date

    // @Prop()
    // checkList: string
}

export const CardSchema = SchemaFactory.createForClass(Card)

// Middleware pour mettre à jour `updatedAt`
CardSchema.pre('save', function (next) {
    this.updatedAt = new Date(); 
    next();
});