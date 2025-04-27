import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'First name has to be a string' })
  firstName: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  hashedPassword: string;
}
