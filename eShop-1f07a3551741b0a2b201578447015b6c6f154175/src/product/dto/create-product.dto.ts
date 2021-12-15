import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {

  @ApiProperty({ example: "Cafe Turkey Marcilla Mix" })
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ example: "Coffe Arabian of Turkey with natural flavor" })
  @IsString()
  readonly description: string

  @ApiProperty({ example: 500 })
  @IsNumber()
  readonly weight: number

  @ApiProperty({ example: "Turkey" })
  @IsString()
  readonly country: string

  @ApiProperty({ example: "Marcilla Cia." })
  @IsString()
  readonly supplier: string

  @ApiProperty({ example: 50 })
  @IsNumber()
  readonly stock: number
  
}