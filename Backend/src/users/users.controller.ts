import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { LoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private logger: LoggerService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    this.logger.debug('Get All Users Endpoint');
    return this.usersService.findAll();
  }

  @Get('/query/:q')
  async query(@Param() param): Promise<User[]> {
    this.logger.debug('Query users q='+param.q);
    return this.usersService.query(param.q);
  }

  @Get(':id')
  async findById(@Param() param): Promise<User> {
    return this.usersService.findById(param.id);
  }

  @Get('/email/:email')
  async findByEmail(@Param() param): Promise<User> {
    return this.usersService.findByEmail(param.email);
  }

  @Post()
  async create(@Body() userDTO: UserDTO): Promise<User> {
    this.logger.debug('Create user');
    return this.usersService.create(userDTO);
  }

  @Put(':id')
  async update(@Param() param, @Body() userDTO: UserDTO): Promise<User> {
    return this.usersService.update(param.id, userDTO);
  }

  @Delete(':id')
  async delete(@Param() param): Promise<User> {
    return this.usersService.delete(param.id);
  }
}
