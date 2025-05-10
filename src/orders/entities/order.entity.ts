import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from "../../users/entities/user.entity";
import { Address } from "../../address/entities/address.entity";
import { OrderStatus } from '../enums/order-status.enums';
import { OrderItems } from './order-item.entity';

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, (user) => user.orders)
  user: User;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: "timestamp", nullable: true })
  payed_time: Date;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @OneToMany(() => OrderItems, (item) => item.order)
  items: OrderItems[];

  @Column({ type: 'bigint', default: 0 })
  total_price: number = 0;

  @Column({ type: 'varchar', nullable: true })
  discount_code: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAT: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAT: Date;

}
