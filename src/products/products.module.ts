import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { BookmarkProduct } from './entities/product-bookmark.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, User, BookmarkProduct]), UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
