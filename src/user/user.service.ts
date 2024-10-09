import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { UserResponseDto } from './dto/userResponse.dto';
import { JwtService } from '@nestjs/jwt';
import { CredentialDto } from './dto/credential.dto';
import { EditPasswordDto } from './dto/edit-password.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }
    async registration(user: UserDto): Promise<UserResponseDto> {

        try {

            const newUser = await this.userModel.create({ ...user })

            newUser.password = await bcrypt.hash(user.password, 10)

            await newUser.save()

            return { success: true, message: "Régitration effectuée avec succes", user: newUser }
        } catch (error) {
            console.log(error)
            return { success: false, message: error.message, user: null }
        }
    }

    async login(credential: CredentialDto) {

        try {
            const user = await this.userModel.findOne({ $or: [{ email: credential.username }, { username: credential.username }] })

            if (!user) {
                return { success: false, message: "Username n'éxiste pas", user: null }
            } else {
                const matchPassword = await bcrypt.compare(credential.password, user.password)

                if (matchPassword) {

                    const payload = { id: user._id, username: user.username, email: user.email };
                    return {
                        success: true,
                        message: "Bienvenue ",
                        access_token: this.jwtService.sign(payload),
                    };

                } else {
                    return { success: false, message: "Mot de passe incorrecte", user: null }
                }
            }

        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", user: null }

        }

    }


    async editUser(id: any, user: UserDto): Promise<UserResponseDto> {

        try {
            const userFound = await this.userModel.findById(id)

            if (!userFound) {
                return { success: false, message: "Utilisateur non trouvé", user: null }
            }

            const userUpdated = await this.userModel.findByIdAndUpdate(id, user)

            return { success: true, message: "Modfication effectuée", user: userUpdated }

        } catch (error) {
            return { success: false, message: 'Une erreur s\'est produite', user: null }
        }
    }


    async editPassword(id: any, editPassword: EditPasswordDto): Promise<UserResponseDto> {
        try {
            const user = await this.userModel.findById(id)

            if (!user) {
                return { success: false, message: "Utilisateur non trouvé", user: null }
            }

            const matchPassowrd = await bcrypt.compare(editPassword.oldPassword, user.password)

            if (!matchPassowrd) {
                return { success: false, message: "L'ancien mot de passe est incorrecte", user: null }
            }

            const newUser = await this.userModel.findByIdAndUpdate(id, editPassword)

            return { success: true, message: "Modfication effectuée", user: newUser }

        } catch (error) {
            return { success: false, message: "Une erreur s'est produite", user: null }
        }
    }

}
