import { PartialType } from '@nestjs/mapped-types'
import { LoginUserDto } from '../../auth/dto/login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto extends PartialType(LoginUserDto) {

  @ApiProperty({ example: "Calle Balmes 123" })
  @IsString()
  readonly adress: string

  @ApiProperty({ example: "+34 911252524" })
  @IsString()
  readonly phone: string

  @ApiProperty({ example: "cliente" })
  @IsString()
  @IsNotEmpty()
  readonly role: string
}