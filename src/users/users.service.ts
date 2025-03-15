import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUsersDto } from './dto/read-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HolidaysEntity } from './entities/holiday.entity';
import { AddHolidaysDto } from './dto/add-holidays-dto';
import { ReadHolidaysDto } from './dto/read-holidays-dto';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(HolidaysEntity)
    private holidaysRepository: Repository<HolidaysEntity>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    await this.userRepository.save(createUserDto);
    return "User created";
  }

  async addHolidays(userID: number, addHolidaysDto: AddHolidaysDto): Promise<string> {
    const allHolidays = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${addHolidaysDto.year}/${addHolidaysDto.countryCode}`)

    const allExist = addHolidaysDto.holidays.every(name =>
      allHolidays.data.some(holiday => holiday.name === name)
    );

    if(!allExist) {
      throw new HttpException("Wrong holiday name passed", HttpStatus.BAD_REQUEST)
    }

    const findResult = await this.holidaysRepository.findOne({
      where: {
        user: userID,
        countryCode: addHolidaysDto.countryCode,
        year: addHolidaysDto.year
      }
    });

    if(findResult) {
      findResult.holidays = findResult.holidays.concat(addHolidaysDto.holidays)
      await this.holidaysRepository.save(findResult)
    } else {
      await this.holidaysRepository.save({
        countryCode: addHolidaysDto.countryCode,
        year: addHolidaysDto.year,
        holidays: addHolidaysDto.holidays,
        user: userID
      })
    }
    

    return "Holidays saved";
  }

  async getHolidays(userID: number): Promise<ReadHolidaysDto[]> {
    return await this.holidaysRepository.find({
      where: {
        user: userID
      }
    });
  }

  async findAll(): Promise<ReadUsersDto[]> {
    return await this.userRepository.find();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
