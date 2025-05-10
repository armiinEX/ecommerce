import { IsNotEmpty, IsNumber } from 'class-validator';


export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Item already exists' })
  productId: number;

  // @IsNumber()
  // @IsNotEmpty({ message: 'Item already exists' })
  // quantity: number;
}