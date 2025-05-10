import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItems } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../users/entities/user.entity';
import { Address } from '../address/entities/address.entity';
import { Product } from '../products/entities/product.entity';
import { UsersService } from '../users/users.service';
import { AddressService } from '../address/address.service';
import { ProductsService } from '../products/products.service';
import { OrderStatus } from './enums/order-status.enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItems)
    private readonly orderItemRepository: Repository<OrderItems>,

    private readonly userService: UsersService,

    private readonly addressService: AddressService,

    private readonly productService: ProductsService,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findOne(createOrderDto.userId);

    const address = await this.addressService.findOne(createOrderDto.addressId);

    const order = this.orderRepository.create({
      user,
      address,
      // total_price: createOrderDto.total_price,
      discount_code: createOrderDto.discount_code,
      status: createOrderDto.status || OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    let totalPrice = 0;
    if (createOrderDto.items && createOrderDto.items.length > 0) {
      const orderItems = createOrderDto.items.map(async (item) => {
        const product = await this.productService.findOne(item.productId);
        totalPrice += product.price

        const orderItem = this.orderItemRepository.create({
          order: savedOrder,
          product
        });

        return this.orderItemRepository.save(orderItem);
      });

      await Promise.all(orderItems);
    }

    await this.orderRepository.update({ id: savedOrder.id }, { total_price: totalPrice });

    const returned_order = await this.orderRepository.findOne({
      where: { id: savedOrder.id }, relations: ["user", "address", "items.product"]
    });

    if (!returned_order) {
      throw new NotFoundException('Order not found');
    }

    return returned_order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'user', 'address'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'user', 'address'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
