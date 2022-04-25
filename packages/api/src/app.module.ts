import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { appConfig } from '../configuration/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../configuration/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) => ({
        ...config,
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true, // TODO: remove before going to production and write migrations
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
