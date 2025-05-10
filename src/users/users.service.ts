import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import userRoleEnum from './enums/userRoleEnum';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    try {
      const alreadyUser = await this.findByMobile(CreateUserDto.mobile, true)

      if (!alreadyUser) {

        const newUser = this.userRepository.create(CreateUserDto)

        return await this.userRepository.save(newUser)
      } else throw new BadRequestException("user already exists")


    } catch (error) {
      console.error('User creation failed:', error);
      throw new BadRequestException({
        message: "Error Creating User",
        details: error.message || error,
      });
    }
  }

  async findAll(role?: userRoleEnum, limit: number = 10, page: number = 1) {
    const query = this.userRepository.createQueryBuilder("users");

    if (role) {
      query.where("role = :role", { role })
    }

    query.skip((page - 1) * limit).take(limit)

    return await query.getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`user '${id}' is not found ...`);

    return user;
  }

  async findByMobile(mobile: string, checkExist: boolean = false) {
    const user = await this.userRepository.findOneBy({ mobile });

    if (!checkExist) if (!user) throw new NotFoundException(`user '${mobile}' is not found ...`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    try {
      // await this.userRepository.update(id, {
      //   display_name: updateUserDto.display_name,
      //   role: updateUserDto.role,
      // }); 

      await this.userRepository.update(id, updateUserDto);

      return await this.findOne(id);;
    } catch (error) {
      throw new BadRequestException("updating user faild!!")
    }
  }

  async remove(id: number): Promise<void> {
    const deleteUser = await this.userRepository.delete(id);

    if (deleteUser.affected === 0)
      throw new NotFoundException(`user '${id}' is not found ...`);

  }

  async addProductToBasket(userId: number, product: Product): Promise<User> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['basket_items']});

    if (!user) {
      throw new NotFoundException('user not found.');
    }

    user.basket_items.push(product);
  
    return await this.userRepository.save(user)
  }

  async removeProductFromBasket(userId: number, product: { id: number }): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['basket_items']
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const productIndex = user.basket_items.findIndex(item => item.id === product.id);

    if (productIndex === -1) {
      throw new NotFoundException('product not found in the basket.')
    }

    user.basket_items.splice(productIndex, 1);

    await this.userRepository.save(user);
  }

}