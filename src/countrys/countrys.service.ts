import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAvailableCountriesDto } from './dto/get-available-countries.dto';
import { GetCountryInfoDto } from './dto/get-country-info.dto';
import axios from 'axios';

@Injectable()
export class CountrysService {

  async getAvailableCountries():Promise<GetAvailableCountriesDto> {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    return response.data;
  }

  async getCountryInfo(code: string):Promise<GetCountryInfoDto> {
    try {
      const countryInfoResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`);
      const populationResponse = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
      const flagURLResponse = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');

      if(countryInfoResponse.data.status === 404) {
        throw new HttpException("Country not found", HttpStatus.NOT_FOUND)
      }

      const result = {
        name: countryInfoResponse.data.officialName,
        borders: countryInfoResponse.data.borders,
        population: populationResponse.data.data.find(item => item.country === countryInfoResponse.data.commonName).populationCounts,
        flagURL: flagURLResponse.data.data.find(item => item.iso2 === code).flag,
      }
  
      return result;

    } catch(e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }





  }
}
