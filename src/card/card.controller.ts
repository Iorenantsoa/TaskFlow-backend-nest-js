import { UseGuards , Body, Controller, Get, Param , Post , Put  , Delete} from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';
import { CardResponseDto } from './dto/cardResponse.dto';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';

@Controller('card')
// @UseGuards(JwtAuthGuard)
export class CardController {

    constructor(
        private cardService: CardService
    ) { }

    @Get('/')
    async findAllCard(): Promise<any> {
        return this.cardService.findCard()
    }

    @Get('/:id')
    async findOneCard(
        @Param('id') id: string
    ): Promise<any> {
        return this.cardService.findOneCard(id)
    }

    @Post('/create-card')
    async createCard(
        @Body() card: CardDto
    ): Promise<CardResponseDto> {
        return this.cardService.createCard(card)
    }

    @Put('/update-card/:id')
    async updateCard(
        @Body() card: CardDto,
        @Param('id') id : string
    ) : Promise <any>{
        return this.cardService.updateCard(card , id)
    }

    @Delete('/delete-card/:id')
    async deleteCard( 
        @Param('id') id : string
    ) : Promise <any>{
        return this.cardService.deleteCard(id)
    }
} 
