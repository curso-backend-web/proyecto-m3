import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'
import { Roles } from '../auth/roles/roles.decorators'
import { Role } from '../auth/roles/role.enum'
import { ApiOperation } from '@nestjs/swagger'


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Register of user' })
    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @ApiOperation({ summary: 'Show list max of role user ' })
    getLimitUser(@Query('limit', ParseIntPipe) limit?: number, @Query('role') role?: string) {
        return this.userService.findLimit(limit,role)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Show one user by name ' })
    @Get(':name')
    getUserByName(@Param('name') name: string) {
        return this.userService.findOne(name)
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('all')
    @ApiOperation({ summary: 'Show all users ' })
    getAllUsers() {
        return this.userService.findAll()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Delete user by userId' })
    @Delete(':id')
    @Roles(Role.Admin)
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteById(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Update attributes of user' })
    @Patch(':id')
    @Roles(Role.Admin)
    update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        return this.userService.updateById(id, createUserDto)
    }

}