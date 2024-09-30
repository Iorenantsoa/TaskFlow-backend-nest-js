import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from './schema/board.schema';
import { Model } from 'mongoose';
import { BoardDto } from './dto/board.dto';
import { BoardResponseDto } from './dto/bordResponse.dto';
import { List } from 'src/list/schema/list.schema';

@Injectable()
export class BoardService {

    constructor(
        @InjectModel(Board.name) private boardModel: Model<Board>,
        @InjectModel(List.name) private listModel: Model<List>
    ) { }

    async createBoard(newBoard: BoardDto): Promise<BoardResponseDto> {

        try {
            const board = await this.boardModel.create(newBoard)
            return { success: true, message: "Tableau ajouté avec success", board }
        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", board: null }
        }
    }

    async findBoard(): Promise<BoardResponseDto> {
        try {
            const board = await this.boardModel.find().populate('lists')
            return { success: true, message: "tous les Tableaux ", board }

        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", board: null }
        }
    }

    async deleteBoard(id: string): Promise<BoardResponseDto> {
        try {

            const board = await this.boardModel.findById(id)

            if (!board) {
                return { success: false, message: "Tableau non trouvé", board: null };
            }

            await this.listModel.deleteMany({ _id: { $in: board.lists } });
            await this.boardModel.findByIdAndDelete(id)

            return { success: true, message: "Tableau effacé avec success", board }
        } catch (error) {
            return { success: false, message: error, board: null }
        }
    }

    async updateBoard(id: string, board: BoardDto): Promise<BoardResponseDto> {
        try {
            const boardUpdated = await this.boardModel.findByIdAndUpdate(id, board)
            return { success: true, message: "Modification effectuée", board: boardUpdated }

        } catch (error) {
            return { success: false, message: error, board: null }
        }
    }
}
