import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/entities/category.entity';
import { Response } from 'express';
import { BookmarkProductDto } from './dto/create-product-bookmark.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    const product = await this.productsService.create(createProductDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: product,
      message: "The product was successfully created.",
    });
  }

  @Post('bookmark-product')
  async bookmarkProduct(@Body() bookmarkProductDto: BookmarkProductDto, @Res() res: Response) {
    const bookmarkData = await this.productsService.toggleBookmark(
      bookmarkProductDto.user_id,
      bookmarkProductDto.product_id
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: bookmarkData,
      message: "The product was successfully bookmarked.",
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: products,
      message: "The products were successfully retrieved.",
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: "The product was successfully retrieved.",
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    const product = await this.productsService.update(+id, updateProductDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: "product updated successfully",
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }

  @Post('add-item-to-basket')
  async addItemToBasket(@Body() bookmarkProductDto: BookmarkProductDto, @Res() res: Response) {
    const addToBasket = await this.productsService.addItemToBasket(
      bookmarkProductDto.user_id,
      bookmarkProductDto.product_id
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: addToBasket,
      message: "The product was successfully added to the basket.",
    });
  }

  @Delete('remove-item-from-basket')
  async removeItemFromBasket(@Body() bookmarkProductDto: BookmarkProductDto, @Res() res: Response) {
      await this.productsService.removeItemFromBasket(
      bookmarkProductDto.user_id,
      bookmarkProductDto.product_id
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "The product was successfully removed from the basket.",
    });
  }
}
