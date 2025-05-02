import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class BookmarkProductDto {
    @IsInt({ message: 'Product ID must be an integer.' })
    @IsPositive({ message: 'Product ID must be a positive number.' })
    @IsNotEmpty({ message: 'Product ID is required.' })
    product_id: number;

    @IsInt({ message: 'User ID must be an integer.' })
    @IsPositive({ message: 'User ID must be a positive number.' })
    @IsNotEmpty({ message: 'User ID is required.' })
    user_id: number;
}
