import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enums';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsNumber({}, { message: 'User ID is required and must be a valid number.' })
  userId: number;

  @IsEnum(OrderStatus, {
    message: 'Status must be a valid order status value.',
  })
  @IsOptional()
  status?: OrderStatus;

  @IsDateString({}, { message: 'Payed time must be a valid ISO 8601 date string.' })
  @IsOptional()
  payed_time: Date;

  @IsNumber({}, { message: 'Address ID is required and must be a valid number.' })
  addressId: number;

  // @IsNumber({}, { message: 'Total price is required and must be a valid number.' })
  // total_price: number;

  @IsString({ message: 'Discount code must be a valid string if provided.' })
  @IsOptional()
  discount_code?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
