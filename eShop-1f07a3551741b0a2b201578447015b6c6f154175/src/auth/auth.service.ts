import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Encryptation } from '../common/utils/encryptation.helper'
import { LoginUserDto } from '../auth/dto/login.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(

        private userService: UserService,
        private jwtService: JwtService

    ) { }

    async validateUser(name: string, pass?: string): Promise<any> {
        
        const user = await this.userService.findOne(name)
        if (!user) {
            throw new BadRequestException('User o Password not exist')
        }

        const isValidPassword = await Encryptation.comparePassword(pass, user.password)
        if (isValidPassword) {
            const { password, role, ...result } = user
            return result
        } else {
            throw new HttpException('User or Password not exist', HttpStatus.BAD_REQUEST);
        }
    }

    async login(user: LoginUserDto) {
        console.log(user)
        const payload = { name: user.name }
        return {
            access_token: await this.jwtService.sign(payload)
        }
    }

}
