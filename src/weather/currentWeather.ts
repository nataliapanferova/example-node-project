import { Coordinates } from './coordinates'
import { get } from 'request-promise-native'


const CURRENT_WEATHER_URI = 'https://api.openweathermap.org/data/2.5/weather'
const CURRENT_WEATHER_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY

export interface CurrentWeather {
  temperature: number
  pressure: number
  humidity: number
}

export class CurrentWeatherManager {
  static async getCurrentWeather(coordinates: Coordinates): Promise<CurrentWeather> {
    const options = {
      qs: {
        appid: CURRENT_WEATHER_API_KEY,
        lat: coordinates.lat,
        lon: coordinates.lon
      }
    }

    const currentWeatherResponse = await get(CURRENT_WEATHER_URI, options)
    const mainInfo = JSON.parse(currentWeatherResponse).main

    return {
      temperature: mainInfo.temp,
      pressure: mainInfo.pressure,
      humidity: mainInfo.humidity
    }
  }
}
