const fs = require('fs')
import {
    Post,
    Controller,
    UploadedFiles,
    UseInterceptors,
    Body
  } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
  
@Controller('images')
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService,
        private logger: LoggerService,
    ) {}

    @Post('/upload')
    @UseInterceptors(
        FilesInterceptor('files', 20, {
            storage: diskStorage({
              destination: './files',
              filename: editFileName,
            }),
            fileFilter: imageFileFilter,
          }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
      const response = []
      for (const file of files) {
          const path = `./files/${file.filename}`
          const secure_url = await this.imagesService.uploadImage(path)
          fs.unlinkSync(path)
          const fileReponse = {
              originalname: file.originalname,
              filename: file.filename,
              secure_url: secure_url
            };
          response.push(fileReponse)          
        }
        return response
      }
}