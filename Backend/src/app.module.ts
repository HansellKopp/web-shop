import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from './logger/logger.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { ImagesModule } from './images/images.module';
import { CategoriesModule } from './categories/categories.module';
import configuration from './config/configuration';

@Module({
  imports: [
    LoggerModule,
    ItemsModule,
    UsersModule,
    AdminsModule,
    ImagesModule,
    CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get('database.uri')}`,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'web'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
