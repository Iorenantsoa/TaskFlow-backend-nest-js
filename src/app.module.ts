import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ListModule } from './list/list.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/taskFlows') , CardModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
