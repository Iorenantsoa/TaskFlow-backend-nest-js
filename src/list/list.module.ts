import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './schema/list.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
  providers: [ListService],
  controllers: [ListController] , 
  exports: [ListService, MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])], 
})
export class ListModule {}
