import { Encryptation } from '../../common/utils/encryptation.helper'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Product {
  @ApiProperty({ example: "194789f3-dbd2-4fa2-853b-4eaf39c5345e"})
  @PrimaryGeneratedColumn('uuid')
  productId: string

  @ApiProperty({ example: "Coffe"})
  @Column()
  name: string

  @ApiProperty({ example: "Coffe Arabian of Turkey with natural flavor."})
  @Column({nullable:true})
  description: string

  @ApiProperty({ example: 500})
  @Column({nullable:true})
  weight: number

  @ApiProperty({ example: "Spain"})
  @Column({nullable: true})
  country: string

  @ApiProperty({ example: "Marcilla Cia."})
  @Column()
  supplier: string

  @ApiProperty({example: 50})
  @Column({nullable: false})
  stock: number
}