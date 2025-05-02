import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('bookmark_products')
export class BookmarkProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.bookmarks)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.bookmarks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
