import { registerAs } from '@nestjs/config';
import { IsInt } from 'class-validator';
import { validateConfig } from './config.validator';

class AppConfig {
  @IsInt()
  port: string;
}
export const appConfig = registerAs('app', () => {
  return validateConfig(AppConfig, {
    port: parseInt(process.env.API_PORT) || 3000,
  });
});
