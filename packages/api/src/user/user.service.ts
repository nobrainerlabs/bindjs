import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { authConfig } from '../configuration/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      email,
    });
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      email: registerUserDto.email,
      passwordHash: await bcrypt.hash(
        registerUserDto.password,
        this.config.bcryptRounds,
      ),
    });
    await this.userRepository.save(user);
    return user;
  }
}
