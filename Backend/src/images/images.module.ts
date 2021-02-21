import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerService } from 'src/logger/logger.service';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    LoggerModule,
    MulterModule.register({
      dest: './files',
    })
  ],
  controllers: [ImagesController],
  providers: [LoggerService, ImagesService],
})

export class ImagesModule {
}
