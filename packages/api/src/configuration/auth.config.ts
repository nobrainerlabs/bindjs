import { registerAs } from '@nestjs/config';
import { IsInt, Min } from 'class-validator';
import { validateConfig } from './config.validator';

class AuthConfig {
  @IsInt()
  @Min(5)
  bcryptRounds: number;
}

export const authConfig = registerAs('auth', async (): Promise<AuthConfig> => {
  return validateConfig(AuthConfig, {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  });
});
