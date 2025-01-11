import { Module } from '@nestjs/common';
import { WeatherCheckerService } from './weather-checker.service';
import { WeatherCheckerController } from './weather-checker.controller';

@Module({
  providers: [WeatherCheckerService],
  controllers: [WeatherCheckerController]
})
export class WeatherCheckerModule {}
