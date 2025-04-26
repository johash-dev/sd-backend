import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;
}
