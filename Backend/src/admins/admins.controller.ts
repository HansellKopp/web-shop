import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminDTO } from './dto/admin.dto';
import { AdminsService } from './admins.service';
import { Admin } from './interfaces/admin.interface';
import { LoggerService } from 'src/logger/logger.service';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private logger: LoggerService,
  ) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    this.logger.debug('Get All Admins Endpoint');
    return this.adminsService.findAll();
  }

  @Get('/query/:q')
  async query(@Param() param): Promise<Admin[]> {
    this.logger.debug('Query admins q='+param.q);
    return this.adminsService.query(param.q);
  }

  @Get(':id')
  async findById(@Param() param): Promise<Admin> {
    return this.adminsService.findById(param.id);
  }

  @Get('/email/:email')
  async findByEmail(@Param() param): Promise<Admin> {
    return this.adminsService.findByEmail(param.email);
  }

  @Post()
  async create(@Body() adminDTO: AdminDTO): Promise<Admin> {
    this.logger.debug('Create admin');
    return this.adminsService.create(adminDTO);
  }

  @Put(':id')
  async update(@Param() param, @Body() adminDTO: AdminDTO): Promise<Admin> {
    return this.adminsService.update(param.id, adminDTO);
  }

  @Delete(':id')
  async delete(@Param() param): Promise<Admin> {
    return this.adminsService.delete(param.id);
  }
}
