import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @ApiProperty({ example: '1234' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;
}
