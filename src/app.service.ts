import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly apiKey = 'ccfbddce13f81114741e1ca95f293df3';
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  async getWeatherByCity(city: string): Promise<any> {
    const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const data =  response.data;

      return{
        city: data.name,
        temperature : `${data.main.temp}°C`,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Unable to fetch weather data');
    }
  }
}
