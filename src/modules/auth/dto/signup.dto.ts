import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'First name has to be a string' })
  @Length(1, 100, { message: 'First name should be within 1-100 characters' })
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '1234' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '1234' })
  confirmPassword: string;
}

export class SignUpResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  email: string;
}
