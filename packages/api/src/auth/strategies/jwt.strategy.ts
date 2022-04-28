import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { AuthConfig, authConfig } from '../../configuration/auth.config';
import { UserEntity } from '../../user/user.entity';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    @Inject(authConfig.KEY) private readonly config: AuthConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
