import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne(id);

    if (ObjectID.isValid(id)) {
      return user;
    } else throw new BadRequestException('User does not exist.');
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const dbUser = await this.userRepository.findOne(id);

    if (dbUser) {
      await this.userRepository.delete(id);
      return;
    } else throw new BadRequestException('User does not exist.');
  }
}
