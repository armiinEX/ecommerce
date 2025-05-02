import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() CreateCategoryDto: CreateCategoryDto, @Res() res: Response) {
      const category = await this.categoriesService.create(CreateCategoryDto);
  
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: category,
        message: "The category was successfully created.",
      });
    }

  @Get()
  async findAll(@Res() res: Response) {
    const categories = await this.categoriesService.findAll();
    
    if (!categories || categories.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "No categories found.",
      });
    }

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: categories,
      message: "Categories retrieved successfully.",
    });  
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const category = await this.categoriesService.findOne(+id);

    if (!category) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Category not found.",
      });
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: category,
      message: "Category retrieved successfully.",
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  @Delete('remove_only_category/:id')
  async removeOnlyCategory(@Param('id') id: string, @Res() res: Response) {
    await this.categoriesService.removeOnlyCategory(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Category and products removed successfully.",
    });
  }

  @Delete('safe_remove/:id')
  async safeRemove(@Param('id') id: string, @Res() res: Response) {
    await this.categoriesService.safeRemove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "Category and products removed successfully.",
    });
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.categoriesService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,  
      message: "Category and products removed successfully.",
    });
  }

}
