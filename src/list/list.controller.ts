import { Controller , Get ,Post , Body  ,Put , Param , Delete} from '@nestjs/common';
import { ListService } from './list.service'; 
import { ListDto } from './dto/list.dto';

@Controller('list')
export class ListController {
    constructor (
        private listService : ListService
    ){ }


    @Get('/')
    async getList() : Promise<any>{
        return this.listService.find()
    }

    @Post('/create-list')
    async createList(
        @Body() newList : ListDto
    ) : Promise<any>{
        return this.listService.createList(newList)
    }

    @Put('/update-list/:id')
    async updateList(
        @Body() list : ListDto,
        @Param('id') id : string
    ) : Promise<any>{
        return this.listService.updateList(id , list)
    }

    @Delete('/delete-list/:id')
    async deleteBoard(
        @Param('id') id : string
    ): Promise<any> { 
        return this.listService.deleteList(id)
    }
}
