import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'userID is required' })
  userID: number;

  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Subject is required' })
  @IsString({ message: 'Subject must be a string' })
  subject: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsOptional()
  @IsInt({ message: 'replyTo must be an integer' })
  replyTo?: number;
}
