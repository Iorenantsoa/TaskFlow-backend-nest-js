import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from './schema/board.schema';
import mongoose, { Model } from 'mongoose';
import { BoardDto } from './dto/board.dto';
import { BoardResponseDto } from './dto/bordResponse.dto';
import { List } from 'src/list/schema/list.schema';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class BoardService {

    constructor(
        @InjectModel(Board.name) private boardModel: Model<Board>,
        @InjectModel(List.name) private listModel: Model<List>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async createBoard(newBoard: BoardDto, user: any): Promise<BoardResponseDto> {

        try {
            const UserFound = await this.userModel.findById(user._id)

            if (!UserFound) {
                return { success: false, message: "Utilisateur non trouvée", board: null }
            }

            const board = await this.boardModel.create({ name: newBoard.name })
            board.users.push(user)
            board.save()

            UserFound.boards.push(board)
            await UserFound.save()

            return { success: true, message: "Tableau ajouté avec success", board }
        } catch (error) {
            return { success: false, message: error, board: null }
        }
    }

    async findBoard(): Promise<BoardResponseDto> {
        try {
            const board = await this.boardModel.find().populate('lists').populate('users')
            return { success: true, message: "tous les Tableaux ", board }

        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", board: null }
        }
    }


    async getMyboards(user: any): Promise<BoardResponseDto> {
        try {
            const userFound = await this.userModel.findById(user._id).populate('boards')


            if (!userFound) {
                return { success: false, message: "Utilisateur non trouvé", board: null }
            }

            const boards = userFound.boards

            if (boards.length > 0) {
                return { success: true, message: "Tableaux récupéré avec success", board: boards }
            } else {
                return { success: true, message: "Vous n'avez pas encore des tableaux à afficher", board: null }
            }


        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", board: null }

        }
    }


    async workingBoard(boardId: any, user: any): Promise<BoardResponseDto> {

        try {
            if (!user) {
                return { success: false, message: "Utilisateur non trouvé", board: null };
            } else {
                const validBoardId = mongoose.Types.ObjectId.isValid(boardId) ? new mongoose.Types.ObjectId(boardId) : null;

                if (!validBoardId) {
                    return { success: false, message: "Identifiant de board invalide", board: null };
                }

                const userFound = await this.userModel.findById(user._id).populate('boards');

                if (userFound) {

                    const board = userFound.boards.find((board: any) => {
                        return board._id.toString() === validBoardId.toString();
                    });

                    if (board) {
                        const workingBoard = await board.populate({
                            path: 'lists',
                            populate: {
                                path: 'cards', // Peupler les cartes à l'intérieur de chaque liste
                                model: 'Card'
                            }
                        });

                        return { success: true, message: "Board trouvé", board: workingBoard };
                    } else {
                        return { success: false, message: "Board non trouvé", board: null };
                    }
                } else {
                    return { success: false, message: "Utilisateur non trouvé", board: null };
                }
            }
        } catch (error) {
            return { success: false, message: error.message || "Erreur serveur", board: null };
        }
    }

    async deleteBoard(id: string, userId: string): Promise<BoardResponseDto> {
        try {

            const board = await this.boardModel.findById(id)

            if (!board) {
                return { success: false, message: "Tableau non trouvé", board: null };
            }


            await this.listModel.deleteMany({ _id: { $in: board.lists } });


            await this.userModel.findByIdAndUpdate(userId, { $pull: { boards: board._id } })

            await this.boardModel.findByIdAndDelete(id)


            return { success: true, message: "Tableau effacé avec success", board }
        } catch (error) {
            console.log(error)
            return { success: false, message: "Une erreur s'est produite", board: null }
        }
    }

    async updateBoard(id: string, board: BoardDto): Promise<BoardResponseDto> {
        try {
            const boardUpdated = await this.boardModel.findByIdAndUpdate(id, board)
            return { success: true, message: "Modification effectuée", board: boardUpdated }

        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", board: null }
        }
    }


}
