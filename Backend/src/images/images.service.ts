import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
    cloudinary: any    
    constructor(private configService:ConfigService) 
    {
        this.cloudinary = require('cloudinary')
        this.cloudinary.v2.config(this.configService.get('cloudinary'))
    }
    
    public uploadImage(imagePath: string) {
        return new Promise((resolve, reject) => 
            this.cloudinary.uploader.upload(imagePath,
                (result: any) => {
                    if(result.secure_url) return resolve(result.secure_url)
                    reject(new Error('Upload service error'))
                }
            )
        )
    }
}
