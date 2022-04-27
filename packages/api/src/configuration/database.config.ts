import { registerAs } from '@nestjs/config';
import { validateConfig } from './config.validator';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

class DatabaseConfig {
  @IsInt()
  port: number;

  @IsString()
  @IsNotEmpty()
  host: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  database: string;
}

export const databaseConfig = registerAs('database', () => {
  return validateConfig(DatabaseConfig, {
    port: parseInt(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'api',
  });
});
