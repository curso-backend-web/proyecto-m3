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
    UseGuards
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'
import { Roles } from '../auth/roles/roles.decorators'
import { Role } from '../auth/roles/role.enum'
import { ApiOperation } from '@nestjs/swagger'

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @ApiOperation({ summary: 'Register of product' })
    @UseGuards(RolesGuard)
    @Post('registerproduct')
    @Roles(Role.Admin)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto)
    }

    @ApiOperation({ summary: 'Show all products ' })
    @Get('all')
    @Roles(Role.Admin)
    findAllProduct() {
        return this.productService.findAllProduct()
    }

    @ApiOperation({ summary: 'Show one product by name ' })
    @Get(':name')
    getProductByName(@Query('name') name: string) {
        return this.productService.findProduct(name)
    }

    @ApiOperation({ summary: 'Show list max of products by name' })
    @Get()
    getLimitProduct(@Query('limit', ParseIntPipe) limit?: number, @Query('name') name?: string) {
        return this.productService.findLimitProduct(limit, name)
    }

    @ApiOperation({ summary: 'Delete product by productId' })
    //@UseGuards(RolesGuard)
    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productService.deleteByIdProduct(id)
    }

    @ApiOperation({ summary: 'Update attributes of product' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    @Roles(Role.Admin)
    updateProduct(@Param('id') id: string, @Body() createProductDto: CreateProductDto) {
        return this.productService.updateByIdProduct(id, createProductDto)
    }

}
