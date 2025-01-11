import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherCheckerService {
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
        description: data.weather[0].description,
        windSpeed: `${data.wind.speed} m/s`,
        humidity: `${data.main.humidity}%`,
      };
    } catch (error) {
      const apiErrorMessage = error.response?.data?.message;

      if (apiErrorMessage === 'city not found') {
        throw new HttpException(
          `The city "${city}" was not found. Please check the spelling or try another city.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (apiErrorMessage === 'Nothing to geocode') {
        throw new HttpException(
          `Please do not leave the input field empty.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new Error(error.response?.data?.message || 'Unable to fetch weather data');
    }
  }
}
