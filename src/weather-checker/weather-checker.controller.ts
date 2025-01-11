import { Controller, Get, Query } from '@nestjs/common';
import { WeatherCheckerService } from './weather-checker.service';

@Controller('weather-checker')
export class WeatherCheckerController {
    constructor(private readonly weatherService: WeatherCheckerService) {}
  @Get('/weather-checker')
  getIndex(): string {
    return `
      <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <style>
        *{
            padding: 10px;
        }
    </style>
</head>
<body>
    <center style="margin: 10px;">
    <div class="col-4">
        <form action="/weather-checker/weather" method="GET">   
            <i class="fa-solid fa-cloud" style="color: #26C6F8; font-size: 11em;"></i>
            <h1>Check City Weather</h1>
            <label for="city">Enter City:</label><br>
            <input class="form-control" type="text" name="city" id="city"><br>
            <button class="form-control" type="submit">Check Weather</button>
        </form>
    </div>
    </center>
</body>
</html>
    `;
  }


  @Get('/weather')
  async getWeather(@Query('city') city: string): Promise<string> {
    var weatherdata = await this.weatherService.getWeatherByCity(city);
    if (!city) {
      return `
        <html>
          <body>
            <script>
              alert('Please enter a city.');
              window.location.href = '/';
            </script>
          </body>
        </html>
      `;
    }

    return `
      <html>
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <style>
                *{
                    padding: 2px;
                }
            </style>
        </head>  
        <body>
            <center>
                <i class="fa-solid fa-cloud" style="color: #26C6F8; font-size: 11em;"></i>
                <h2>${weatherdata.city} City<h2>
                <h4></h4>
                <h2>Cloud Coverage<h2>
                <h4>${weatherdata.description}</h4>
                <h2>Current Temperature:<h2>
                <h4><i class="fa-solid fa-temperature-half"></i>${weatherdata.temperature}</h4>
                <h2>Wind Speed<h2>
                <h4><i class="fa-solid fa-wind"></i>${weatherdata.windSpeed}</h4>
                <h2>Humidity<h2>
                <h4><i class="fa-solid fa-droplet"></i>${weatherdata.humidity}</h4>
                <div class="col-4">
                    <button class="btn btn-primary w-100" id="back" onclick="backhome()">Check another City/Weather</button>
                </div> 
            </center>
          <script>
              function backhome(){
                window.location.href = '/weather-checker';
              }
            </script>
        </body>
      </html>
    `;
  }
}
