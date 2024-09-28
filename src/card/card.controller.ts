import { Body, Controller, Get, Param , Post , Put } from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';
import { CardResponseDto } from './dto/cardResponse.dto';

@Controller('card')
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
        @Param() id: string
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
        @Param() id : string
    ) : Promise <any>{
        this.cardService.updateCard(card , id)
    }

} 
