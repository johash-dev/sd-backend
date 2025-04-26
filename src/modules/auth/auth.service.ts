import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  signUp(signUpDto: SignUpDto) {
    const user = new User();
    user.firstName = signUpDto.firstName;
    user.email = signUpDto.email;
    user.password = signUpDto.password;

    return this.userRepository.save(user);
  }
}
