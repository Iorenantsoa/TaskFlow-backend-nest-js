import { Controller, Body, Post, Get, Req, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { CredentialDto } from './dto/credential.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserLoggedDto } from './dto/user-logged.dto';
import { EditPasswordDto } from './dto/edit-password.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) { }


    @Post('/registration')
    async registration(
        @Body() user: UserDto
    ): Promise<UserResponseDto> {
        return this.userService.registration(user)
    }

    @Post('/login')
    async login(
        @Body() credential: CredentialDto
    ): Promise<any> {
        return this.userService.login(credential)
    }

    @Get('/getUserLoggedIn')
    @UseGuards(JwtAuthGuard)
    async getUserLoggedIn(
        @Req() request: any
    ): Promise<UserLoggedDto | null> {


        const user = request.user
        if (!user) {
            return null
        }
        return { username: user.username, email: user.email }
    }


    @Put('/editUser')
    @UseGuards(JwtAuthGuard)
    async editUser(
        @Body() user: UserDto,
        @Req() request: any
    ): Promise<any> {
        const id = request.user
        if (!id) {
            return { success: false, message: "Utilisateur non trouvé", user: null }
        }
        return this.userService.editUser(id, user)
    }

    @Put('/editPassword')
    @UseGuards(JwtAuthGuard)
    async editPassword(
        @Body() user: EditPasswordDto,
        @Req() request: any
    ): Promise<any> {
        const id = request.user
        if (!id) {
            return { success: false, message: "Utilisateur non trouvé", user: null }
        }
        return this.userService.editPassword(id, user)
    }

}
