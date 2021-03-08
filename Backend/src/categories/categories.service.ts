import { Injectable } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly CategoryModel: Model<Category>) {}

  async findAll(): Promise<Category[]> {
    return this.CategoryModel.find().exec();
  }

  async query(query: string): Promise<Category[]> {
    return this.CategoryModel.find(
      {$or: [
        { title: {$regex: query, $options: 'i'}}, 
      ]}).exec();
  }

  async findById(id: string): Promise<Category> {
    return id.match(/^[0-9a-fA-F]{24}$/)
      ? await this.CategoryModel.findOne({ _id: id })
      : null;
  }

  async create(Category: CategoryDTO) {
    const newCategory = new this.CategoryModel(Category);
    return newCategory.save();
  }

  async delete(id: string): Promise<Category> {
    return this.CategoryModel.findByIdAndRemove(id);
  }

  async update(id: string, Category: CategoryDTO): Promise<Category> {
    return await this.CategoryModel.findByIdAndUpdate(id, Category, { new: true });
  }
}
