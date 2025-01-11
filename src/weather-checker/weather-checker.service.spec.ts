import { Test, TestingModule } from '@nestjs/testing';
import { WeatherCheckerService } from './weather-checker.service';

describe('WeatherCheckerService', () => {
  let service: WeatherCheckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherCheckerService],
    }).compile();

    service = module.get<WeatherCheckerService>(WeatherCheckerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
