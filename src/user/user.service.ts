import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { UserResponseDto } from './dto/userResponse.dto';
import { JwtService } from '@nestjs/jwt';
import { CredentialDto } from './dto/credential.dto';

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
                        success : true , 
                        message : "Bienvenue ",
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

     



}
