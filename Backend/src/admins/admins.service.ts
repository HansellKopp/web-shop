import { Injectable } from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdminDTO } from './dto/admin.dto';

@Injectable()
export class AdminsService {
  constructor(@InjectModel('Admin') private readonly adminModel: Model<Admin>) {}

  async findAll(): Promise<Admin[]> {
    try {      
      // this.adminModel.deleteMany({ "email" : "hansellkopp@hotmail.com" }).then(() => console.log('deleted'))
    } catch (error) {
      console.log(error)
    }
    return this.adminModel.find().exec();
  }

  async query(query: string): Promise<Admin[]> {
    return this.adminModel.find({ title : {$regex: query, $options: 'i'}}).exec();
  }

  async findById(id: string): Promise<Admin> {
    return id.match(/^[0-9a-fA-F]{24}$/)
      ? await this.adminModel.findOne({ _id: id })
      : null;
  }

  async findByEmail(email: string): Promise<Admin> {
      return await this.adminModel.findOne({ email: email })
  }

  async create(admin: AdminDTO) {
    const newAdmin = new this.adminModel(admin);
    const currentAdmin = await this.findByEmail(admin.email)
    if(currentAdmin) {
      return currentAdmin
    }
    return newAdmin.save();
  }

  async delete(id: string): Promise<Admin> {
    
    return this.adminModel.findByIdAndRemove(id);
  }

  async update(id: string, admin: AdminDTO): Promise<Admin> {
    return await this.adminModel.findByIdAndUpdate(id, admin, { new: true });
  }
}
