import { LoggerModule } from './logger/logger.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImagesModule } from './images/images.module';
import configuration from './config/configuration';

@Module({
  imports: [
    LoggerModule,
    ItemsModule,
    UsersModule,
    AdminsModule,
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
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
