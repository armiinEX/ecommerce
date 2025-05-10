import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from "../../users/entities/user.entity";
import { Address } from "../../address/entities/address.entity";
import { OrderStatus } from '../enums/order-status.enums';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity("order_items")
export class OrderItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

    @ManyToOne(() => Product)
    product: Product;

    // @Column({ type: "int" })
    // quantity: number;

}
