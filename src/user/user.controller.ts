import { Controller , Body , Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { CredentialDto } from './dto/credential.dto';

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

}
