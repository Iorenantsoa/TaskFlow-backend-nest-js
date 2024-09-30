import { UseGuards ,Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';
import { BoardResponseDto } from './dto/bordResponse.dto'; 
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';

@Controller('board')
// @UseGuards(JwtAuthGuard)
export class BoardController {

    constructor(
        private boardService: BoardService
    ) { }

    @Get('/')
    async findAllBoard(): Promise<any> {
        return this.boardService.findBoard()
    }

    @Post('/create-board')
    async createBoard(
        @Body() board: BoardDto
    ): Promise<BoardResponseDto> {
        return this.boardService.createBoard(board)
    }

    @Put('/update-board/:id')
    async updateBoard(
        @Body() board: BoardDto,
        @Param('id') id: string
    ): Promise<any> {
        return this.boardService.updateBoard(id , board)
    }

    @Delete('/delete-board/:id')
    async deleteBoard(
        @Param('id') id : string
    ): Promise<any> {
         
        return this.boardService.deleteBoard(id)
    }
}
