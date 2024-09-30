import { Injectable } from '@nestjs/common';
import { Card, CardDocument } from './schema/card.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardDto } from './dto/card.dto';
import { CardResponseDto } from './dto/cardResponse.dto';
import { List, ListDocument } from 'src/list/schema/list.schema';

@Injectable()
export class CardService {

    constructor(
        @InjectModel(Card.name) private cardModel: Model<CardDocument>,
        @InjectModel(List.name) private listModel: Model<ListDocument>
    ) { } 
 
    async createCard(card: CardDto): Promise<CardResponseDto> {

        try {
            const newCard = await this.cardModel.create(card)
            const cardData = newCard.toObject()

            const aa = await this.listModel.findByIdAndUpdate({ _id: newCard.list }, { $push: { cards: newCard._id } })
            console.log(aa)
            return { success: true, message: "Carte ajoutée avec success", card: cardData }
        } catch (error) {
            return { success: false, message: error, card: null }
        }
    }

    async findCard(): Promise<CardResponseDto> {
        try {
            const card = await this.cardModel.find().populate('list')
            return { success: true, message: "toutes les cartes", card: card }

        } catch (error) {
            return { success: false, message: error, card: null }
        }
    }


    async findOneCard(id: string): Promise<CardResponseDto> {
        try {
            const card = await this.cardModel.findOne({ _id: id })
            return { success: true, message: "Carte trouvée", card }
        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", card: null }
        }
    }

    async updateCard(card: CardDto, id: string): Promise<CardResponseDto> {
        try {
            const cardUpdated = await this.cardModel.findByIdAndUpdate({ _id: id, card })
            return { success: true, message: "toutes les cartes", card: cardUpdated }
        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", card: null }
        }
    }

    async deleteCard(id: string): Promise<any> {
        try {
            this.cardModel.findByIdAndDelete({ _id: id })
            return { success: true, message: "Carte effacée avec success" }

        } catch (error) {
            return { success: false, message: "Une erreur s'est produite" }
        }
    }
}
