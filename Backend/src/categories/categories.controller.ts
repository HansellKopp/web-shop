import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { CategoryDTO } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { LoggerService } from 'src/logger/logger.service';

@Controller('categories')
export class CategoriesController {
  constructor(
      private readonly categoriesService: CategoriesService,
      private logger: LoggerService,
    ) {}
  
    @Get()
    async findAll(): Promise<Category[]> {
      this.logger.debug('Get All Categorys Endpoint');
      return this.categoriesService.findAll();
    }
  
    @Get('/query/:q')
    async query(@Param() param): Promise<Category[]> {
      this.logger.debug('Query categories q='+param.q);
      return this.categoriesService.query(param.q);
    }
  
    @Get(':id')
    async findById(@Param() param): Promise<Category> {
      return this.categoriesService.findById(param.id);
    }
  
    @Post()
    async create(@Body() categoryDTO: CategoryDTO): Promise<Category> {
      return this.categoriesService.create(categoryDTO);
    }
  
    @Put(':id')
    async update(@Param() param, @Body() categoryDTO: CategoryDTO): Promise<Category> {
      return this.categoriesService.update(param.id, categoryDTO);
    }
  
    @Delete(':id')
    async delete(@Param() param): Promise<Category> {
      return this.categoriesService.delete(param.id);
    }
  }
  