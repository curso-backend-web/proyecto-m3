import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {

  @ApiProperty({ example: "Antonio" })
  @IsString()
  readonly name: string

  @ApiProperty({ example: "nameSecret" })
  @IsNotEmpty()
  readonly password: string
  
}