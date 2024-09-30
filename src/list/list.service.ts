import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './schema/list.schema';
import { Model } from 'mongoose';
import { ListResponseDto } from './dto/ListResponse.dto';
import { ListDto } from './dto/list.dto';
import { Board, BoardDocument } from 'src/board/schema/board.schema';
import { Card, CardDocument } from 'src/card/schema/card.schema';

@Injectable()
export class ListService {


    constructor(
        @InjectModel(List.name) private listModel: Model<ListDocument>,
        @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
        @InjectModel(Card.name) private cardModel: Model<CardDocument>
    ) { }

    async find(): Promise<ListResponseDto> {

        try {
            const lists = await this.listModel.find().populate('cards')

            return { success: true, message: "Toutes les listes", list: lists }

        } catch (error) {
            return { success: false, message: error, list: null }

        }
    }

    async createList(newList: ListDto): Promise<ListResponseDto> {
        try {
            const list = await this.listModel.create(newList)

            const aa = await this.boardModel.findByIdAndUpdate({ _id: newList.board }, { $push: { lists: list._id } })
            console.log(aa)
            return { success: true, message: "Liste créee avec success", list: list }
        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", list: null }
        }
    }

    async updateList(id: string, list: ListDto): Promise<ListResponseDto> {

        try {
            const listUpdated = await this.listModel.findByIdAndUpdate({ _id: id, list })
            return { success: true, message: "Liste créee avec success", list: listUpdated }
        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", list: null }
        }

    }

    async deleteList(id: string): Promise<ListResponseDto> {
        try {

            const list = await this.listModel.findById(id)
            if (!list) {
                return { success: false, message: "Pas de Liste à supprimée", list: null }
            }

            await this.cardModel.deleteMany({ _id: { $in: list.cards } })

            await this.listModel.findByIdAndDelete(id)
            
            return { success: true, message: "Liste effacée avec success", list }
        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", list: null }
        }
    }


}
