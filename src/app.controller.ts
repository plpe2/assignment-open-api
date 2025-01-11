import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getIndex(): string {
    return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weather App</title>
        </head>
        <body>
          <form action="/weather" method="GET">
            <h1>Check Weather City</h1>
            <label for="city">Enter City:</label>
            <input type="text" name="city" id="city"><br>
            <button type="submit">Check Weather</button>
          </form>
        </body>
      </html>
    `;
  }


  @Get('/weather')
  getWeather(@Query('city') city: string): string {
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

    // If city is provided, show the entered city in an alert
    return `
      <html>
        <body>
          <h2>${city}</h2>
          <button id="back" onclick="backhome()">Check another City/s Weather</button> 
          <script>
              function backhome(){
                window.location.href = '/';
              }
            </script>
        </body>
      </html>
    `;
  }
}
