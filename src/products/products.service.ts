import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { BookmarkProduct } from './entities/product-bookmark.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,

    @InjectRepository(BookmarkProduct)
    private bookmarkProductRepository: Repository<BookmarkProduct>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, price, description, stock, categoryIds } = createProductDto;
    const product = await this.productRepository.create({ title, price, description, stock, });

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
      product.categories = categories;
    }

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['categories'] });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { title, price, description, stock, categoryIds } = updateProductDto;
    const product: Product = await this.findOne(id);

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    if (stock) product.stock = stock;
    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
      product.categories = categories;
    }

    return await this.productRepository.save(product);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }

  async toggleBookmark(userId: number, productId: number): Promise<BookmarkProduct | void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!user || !product) {
      throw new NotFoundException('User or product not found');
    }

    const existingBookmark = await this.bookmarkProductRepository.findOne(
      {
        where: {
          user: { id: userId },
          product: { id: productId }
        }
      });

    if (existingBookmark) {
      await this.bookmarkProductRepository.remove(existingBookmark);
    } else {
      const newBookmark = this.bookmarkProductRepository.create({
        user,
        product
      });
      return await this.bookmarkProductRepository.save(newBookmark);
    }    
  }
}
