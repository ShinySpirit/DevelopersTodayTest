import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountrysService } from './countrys.service';
import { GetAvailableCountriesDto } from './dto/get-available-countries.dto';
import { GetCountryInfoDto } from './dto/get-country-info.dto';

@Controller('countrys')
export class CountrysController {
  constructor(private readonly countrysService: CountrysService) {}

  @Get()
  async getAvailableCountries(): Promise<GetAvailableCountriesDto> {
    return this.countrysService.getAvailableCountries();
  }

  @Get("/info/:code")
  async getCountryInfo(@Param('code') code: string): Promise<GetCountryInfoDto> {
    return this.countrysService.getCountryInfo(code);
  }
}
