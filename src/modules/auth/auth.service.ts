import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { HashingService } from 'src/util/hashing.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private hashingService: HashingService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findOneByEmail(signUpDto.email);

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
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

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

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
}
