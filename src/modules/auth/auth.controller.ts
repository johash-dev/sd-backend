import { Controller, Post, Body, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User sign up' })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully!',
    type: SignUpResponseDto,
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User log in' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully!',
    type: LoginResponseDto,
  })
  login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('token/:token')
  verifyToken(@Param('token') token: string) {
    return this.authService.verifyToken(token);
  }
}
