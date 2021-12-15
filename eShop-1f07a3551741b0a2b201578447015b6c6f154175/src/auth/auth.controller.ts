import {Body, 
        Controller, 
        Post, 
        UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login.dto'
import { LocalAuthGuard } from './strategies/local-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Login of user' })
    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto)
    }
}


