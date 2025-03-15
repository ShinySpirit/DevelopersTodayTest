import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddHolidaysDto } from './dto/add-holidays-dto';
import { ReadHolidaysDto } from './dto/read-holidays-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("/:userId/calendar/holidays")
  async addHolidays(@Body() holidays: AddHolidaysDto, @Param('userId') userID: number): Promise<string> {
    return this.usersService.addHolidays(userID, holidays);
  }

  @Get("/:userId/calendar/holidays")
  async getHolidays(@Param('userId') userID: number): Promise<ReadHolidaysDto[]> {
    return await this.usersService.getHolidays(userID);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
