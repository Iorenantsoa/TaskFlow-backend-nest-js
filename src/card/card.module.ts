import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card, CardSchema } from './schema/card.schema';
import { MongooseModule } from '@nestjs/mongoose';    
import { ListModule } from 'src/list/list.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }])  , ListModule ],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule { 



  
}
