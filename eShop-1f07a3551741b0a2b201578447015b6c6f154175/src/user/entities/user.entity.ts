import { Encryptation } from '../../common/utils/encryptation.helper'
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @ApiProperty({ example: "194789f3-dbd2-4fa2-853b-4eaf39c5345e"})
  @PrimaryGeneratedColumn('uuid')
  userId: string

  @ApiProperty({ example: "Pepe Lopez"})
  @Column({ unique: true })
  name: string

  @ApiProperty({ example: "ahasdfllllhdlhlalfa.ldsaflas.ladfh"})
  @Column()
  password: string

  @ApiProperty({ example: "Calle Balmes 22, 2-1"})
  @Column()
  adress: string

  @ApiProperty({ example: "+34 887574883"})
  @Column()
  phone: string

  @ApiProperty({ example: "cliente"})
  @Column({default: "cliente"})
  role: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await Encryptation.encryptPassword(this.password)
  }
}