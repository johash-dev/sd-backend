import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/util/hashing.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: signUpDto.email } });

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashingService.getHashedString(signUpDto.password);

    const user = new User();
    user.firstName = signUpDto.firstName;
    user.email = signUpDto.email;
    user.password = hashedPassword;

    const savedUser = await this.userRepository.save(user);

    const payload: JwtPayload = { id: savedUser.id, email: savedUser.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.hashingService.compareString(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
