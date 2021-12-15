import { Injectable, HttpStatus, HttpException, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './entities/product.entity'
@Injectable()
export class ProductService {

    constructor(

        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async createProduct(createProductDto: CreateProductDto) {

        let nameDto = createProductDto.name
        //const repeat = await this.productRepository.findOne({ name: nameDto })

        if ((!nameDto)) {
            throw new BadRequestException('No possible register, product datas error')
        } else {

            const product = new Product()
            Object.assign(product, createProductDto)
            return await this.productRepository.save(product)

        }
    }

    async findAllProduct(): Promise<Product[]> {
        return await this.productRepository.find()
    }


    async findProduct(nameDto: string): Promise<Product[]> {
        const product = await this.productRepository.findOne({ name: nameDto })
        if (!product) {
            throw new NotFoundException({ statusCode: 400, message: `Product ${nameDto} not exist in database` })
        } else {

            const result = (await this.productRepository.find({ name:nameDto })).slice(0)
            return result
        }
        
    }

    async findLimitProduct(limit: number, name: string): Promise<Product[]> {

        const check = await this.productRepository.findOne({ name: name })

        if (!check) {
            throw new NotFoundException({ statusCode: 404, message: `Product no exist` })
        }
        if ((limit <= 0)) {
            throw new NotFoundException({ statusCode: 404, message: `Parameters no corrects` })

        } else {

            const result = (await this.productRepository.find({ name })).slice(0, limit)
            return result
        }
    }

    async deleteByIdProduct(id: string): Promise<any> {
        const product = await this.productRepository.findOne({ productId: id })
        if (!product) {
            throw new NotFoundException({ statusCode: 400, message: `Product to delete ${id} not exist in database` })
        }
        await this.productRepository.delete(product)
        return product
    }

    async updateByIdProduct(id: string, createProductDto: CreateProductDto): Promise<Product> {
        const product = await this.productRepository.findOne({ productId: id })
        if ((!product) || (!product.productId)) {
            throw new NotFoundException({ statusCode: 400, message: `Product update ${id} not exist in database` })
        } else {

            Object.assign(product, createProductDto)
            await this.productRepository.save(product)
            return product

        }
    }
}
