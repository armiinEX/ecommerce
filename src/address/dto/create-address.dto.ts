import { IsNotEmpty, IsString, Length, IsOptional, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'userID is required' })
  userID: number;

  @IsString({ message: "Province must be a string" })
  @IsNotEmpty({ message: 'Province is required' })
  province: string;

  @IsString({ message: "City must be a string" })
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsString({ message: "Postal code must be a string" })
  @Length(10, 10, { message: 'Postal code must be exactly 10 characters long' })
  @IsOptional()
  postal_code: string;

  @IsString({ message: "Address must be a string" })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsString({ message: "Phone number must be a string" })
  @Matches(/^09\d{9}$/, { message: 'Phone number must be a valid Iranian number' })
  receiver_mobile: string;

  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;
}
