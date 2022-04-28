import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register.dto';
import { RegisterSuccessDto } from './dto/register-success.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<RegisterSuccessDto> {
    if (await this.userService.findByEmail(registerUserDto.email)) {
      throw new BadRequestException(
        `Email ${registerUserDto.email} already registered`,
      );
    }
    const user = await this.userService.register(registerUserDto);
    return {
      uuid: user.uuid,
      email: user.email,
    };
  }
}
