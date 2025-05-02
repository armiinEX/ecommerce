import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import userRoleEnum from './enums/userRoleEnum';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto, @Res() res: Response) {
    const createUser = await this.usersService.create(CreateUserDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createUser,
      message: "The user was successfully built.",
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query("role") role?: userRoleEnum,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1,
  ) {
    const users = await this.usersService.findAll(role, limit, page);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: users,
      message: "users found",
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
      message: "User found",
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    const updateUserDto = plainToInstance(
      UpdateUserDto,
      body,
      {excludeExtraneousValues: true}
    );

    const user = await this.usersService.update(+id, updateUserDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
      message: "User updated",
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: "User deleted",
    });
  }
}
  