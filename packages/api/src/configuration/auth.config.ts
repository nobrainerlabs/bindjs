import { registerAs } from '@nestjs/config';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { validateConfig } from './config.validator';

export class AuthConfig {
  @IsInt()
  @Min(5)
  bcryptRounds: number;

  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  jwtExpiresIn: string;
}

export const authConfig = registerAs('auth', async (): Promise<AuthConfig> => {
  return validateConfig(AuthConfig, {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
    jwtSecret: process.env.JWT_SECRET || 'Not a secret!',
    jwtExpiresIn: process.env.JWT_EXPIRE_IN || '1h',
  });
});
