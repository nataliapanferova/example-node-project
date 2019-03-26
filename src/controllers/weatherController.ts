import { Request, Response } from 'express'
import { CoordinatesManager } from '../weather/coordinates'
import { CurrentWeatherManager } from '../weather/currentWeather'
import { CurrentUvManager } from '../weather/currentUvi'

interface Weather {
  temperature: number
  pressure: number
  humidity: number
  uvi: number
}

export class WeatherController {

  // Router functions are Express middleware
  // they must either complete(respond to) the request or call the next function in the chain
  // we complete the request using json(), so the next argument is not needed

  getWeather = async(req: Request, res: Response) => {
    try {
      const weather = await this.getWeatherData(req.query.address)
      res.json(weather)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }

  private async getWeatherData(address: string): Promise<Weather> {
    const coordinates = await CoordinatesManager.getCoordinates(address)

    // if one request fails the error will be sent to the client without waiting for the second one to complete
    const [weatherData, uvi] = await Promise.all([
      CurrentWeatherManager.getCurrentWeather(coordinates),
      CurrentUvManager.getCurrentUvi(coordinates)
    ])

    return {
      temperature: weatherData.temperature,
      pressure: weatherData.pressure,
      humidity: weatherData.humidity,
      uvi: uvi
    }
  }
}
