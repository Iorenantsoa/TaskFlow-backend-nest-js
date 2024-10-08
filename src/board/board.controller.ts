import { UseGuards, Controller, Get, Post, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';
import { BoardResponseDto } from './dto/bordResponse.dto';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';

@Controller('board')
@UseGuards(JwtAuthGuard)
export class BoardController {

    constructor(
        private boardService: BoardService
    ) { }

    @Get('/')
    async findAllBoard(): Promise<any> {
        return this.boardService.findBoard()
    }
    @Get('/myBoards')
    async getMyboards(
        @Req() request: any
    ): Promise<any> {
        const user = request.user
        return this.boardService.getMyboards(user)
    }
    @Post('/create-board')
    async createBoard(
        @Body() board: BoardDto,
        @Req() request: any
    ): Promise<BoardResponseDto> {
        const user = request.user
        return this.boardService.createBoard(board, user)
    }

    @Put('/update-board/:id')
    async updateBoard(
        @Body() board: BoardDto,
        @Param('id') id: string
    ): Promise<any> {
        return this.boardService.updateBoard(id, board)
    }
 
    @Delete('/delete-board/:id')
    async deleteBoard(
        @Param('id') id: string , 
        @Req() req : any
    ): Promise<any> {
        const user = req.user
        return this.boardService.deleteBoard(id , user)
    }

    @Get("workingBoard/:id")
    async workingBoard(
        @Param('id') id: string,
        @Req() request: any
    ): Promise<any> {
        const user = request.user
        return this.boardService.workingBoard(id, user)
    }
}
