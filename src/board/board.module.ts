import { Module  , forwardRef} from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, boardSchema } from './schema/board.schema';
import { ListModule } from 'src/list/list.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Board.name, schema: boardSchema }]) , forwardRef(() => UserModule) ,  forwardRef(() => ListModule) , ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService, MongooseModule.forFeature([{ name: Board.name, schema: boardSchema }])],
})
export class BoardModule { }
 