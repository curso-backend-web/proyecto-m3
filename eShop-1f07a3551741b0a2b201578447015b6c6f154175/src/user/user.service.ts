import { Injectable, HttpStatus, HttpException, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto) {

        let nameDto = createUserDto.name
        const repeat = await this.userRepository.findOne({ name: nameDto })

        if ((repeat) || (!nameDto)) {
            throw new BadRequestException('No possible register, User already exists or datas error')
        } else {

            const user = new User()
            Object.assign(user, createUserDto)
            return await this.userRepository.save(user)

        }
    }

    async findOne(nameDto: string): Promise<User> {
        const user = await this.userRepository.findOne({ name: nameDto })
        if (!user) {
            throw new NotFoundException({ statusCode: 400, message: `User ${nameDto} not exist in database` })
        }
        return user
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findLimit(limit:number, role:string): Promise<User[]> { 

        const check = await this.userRepository.findOne({ role: role })

        if (!check) {
            throw new NotFoundException({ statusCode: 404, message: `Role no exist` })
        }
        if ((limit <= 0)) {
            throw new NotFoundException({ statusCode: 404, message: `Parameters no corrects` })

        } else {

            const result = (await this.userRepository.find({ role })).slice(0, limit)
            return result
        }

        // if ((limit <= 0)) {
        //     throw new NotFoundException({ statusCode: 404, message: `Parameters no corrects` })

        // } else {
            
        //     const result = (await this.userRepository.find()).slice(0,limit)
        //     return result
        // }
    }

    async deleteById(id: string): Promise<any> {
        const user = await this.userRepository.findOne({ userId: id })
        if (!user) {
            throw new NotFoundException({ statusCode: 400, message: `User ${id} not exist in database` })
        }
        await this.userRepository.delete(user)
        return user
    }

    async updateById(id: string, createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ userId: id })
        if ((!user) || (!user.userId)) {
            throw new NotFoundException({ statusCode: 400, message: `User ${id} not exist in database` })
        } else {
            const roleDto = createUserDto.role
            if ((roleDto == 'admin') || (roleDto == 'cliente')) {
                Object.assign(user, createUserDto)
                await this.userRepository.save(user)
                return user
            } else {
                throw new NotFoundException({ statusCode: 404, message: `Role no possible , only admin or cliente` })
            }
        }
    }




}
