import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    try {      
      // this.userModel.deleteMany({ "email" : "hansellkopp@hotmail.com" }).then(() => console.log('deleted'))
    } catch (error) {
      console.log(error)
    }
    return this.userModel.find().exec();
  }

  async query(query: string): Promise<User[]> {
    return this.userModel.find({ title : {$regex: query, $options: 'i'}}).exec();
  }

  async findById(id: string): Promise<User> {
    return id.match(/^[0-9a-fA-F]{24}$/)
      ? await this.userModel.findOne({ _id: id })
      : null;
  }

  async findByEmail(email: string): Promise<User> {
      return await this.userModel.findOne({ email: email })
  }

  async create(user: UserDTO) {
    const newUser = new this.userModel(user);
    const currentUser = await this.findByEmail(user.email)
    if(currentUser) {
      return currentUser
    }
    return newUser.save();
  }

  async delete(id: string): Promise<User> {
    
    return this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: UserDTO): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
