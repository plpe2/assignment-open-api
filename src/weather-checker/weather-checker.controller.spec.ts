import { Test, TestingModule } from '@nestjs/testing';
import { WeatherCheckerController } from './weather-checker.controller';

describe('WeatherCheckerController', () => {
  let controller: WeatherCheckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherCheckerController],
    }).compile();

    controller = module.get<WeatherCheckerController>(WeatherCheckerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
