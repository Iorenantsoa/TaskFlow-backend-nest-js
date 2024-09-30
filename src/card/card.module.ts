import { Module ,forwardRef} from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card, CardSchema } from './schema/card.schema';
import { MongooseModule } from '@nestjs/mongoose';    
import { ListModule } from 'src/list/list.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])  , forwardRef(() => ListModule)   ,  forwardRef(() => ListModule)],
  controllers: [CardController],
  providers: [CardService],
  exports : [CardService, MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])]
})
export class CardModule { 

}
  