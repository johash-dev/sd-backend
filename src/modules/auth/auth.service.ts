import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';
import { HashingService } from 'src/util/hashing.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { jwtConstants } from 'src/util/constants';
import { JwtResponse } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private hashingService: HashingService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashingService.getHashedString(signUpDto.password);

    const userDto = new CreateUserDto();
    userDto.firstName = signUpDto.firstName;
    userDto.email = signUpDto.email;
    userDto.hashedPassword = hashedPassword;

    const savedUser = await this.userService.create(userDto);

    return {
      token: await this.jwtService.signAsync({ id: savedUser.id }),
      id: savedUser.id,
      email: savedUser.email,
      firstName: savedUser.firstName,
    };
  }

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByEmail(loginDto.email.toLowerCase());

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.hashingService.compareString(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      token: await this.jwtService.signAsync({ id: user.id }),
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };
  }

  async verifyToken(token: string): Promise<LoginResponseDto> {
    try {
      const decoded = await this.jwtService.verifyAsync<JwtResponse>(token, {
        secret: jwtConstants.secret,
      });
      const userResponse = await this.userService.findOneById(decoded.id);
      return {
        token,
        ...userResponse,
      };
    } catch (error: unknown) {
      throw new UnauthorizedException('Invalid or expired token', { cause: error });
    }
  }
}
