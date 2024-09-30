import { Module  ,forwardRef} from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './schema/list.schema';
import { BoardModule } from 'src/board/board.module';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]) , forwardRef(() => BoardModule),forwardRef(() => CardModule)],
  providers: [ListService],
  controllers: [ListController] , 
  exports: [ListService, MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])], 
})
export class ListModule {}
   