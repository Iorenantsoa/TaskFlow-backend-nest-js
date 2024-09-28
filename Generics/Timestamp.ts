// timestamp.schema.ts
import { Prop } from '@nestjs/mongoose';

export class Timestamp {
    @Prop({ type: Date, default: Date.now })  // Date de création
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })  // Date de mise à jour
    updatedAt: Date;
}
