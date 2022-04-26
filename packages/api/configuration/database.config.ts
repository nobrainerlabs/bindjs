import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  port: parseInt(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'api',
}));
