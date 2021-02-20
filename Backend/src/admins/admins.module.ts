import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerService } from 'src/logger/logger.service';
import { AdminsController } from './Admins.controller';
import { AdminsService } from './Admins.service';
import { AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    LoggerModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService, LoggerService],
})
export class AdminsModule {}