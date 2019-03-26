import { Coordinates } from './coordinates'
import { get } from 'request-promise-native'


const CURRENT_UVI_URI = 'https://api.openweathermap.org/data/2.5/uvi'
const CURRENT_UVI_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY

export class CurrentUvManager {
  static async getCurrentUvi(coordinates: Coordinates): Promise<number> {
    const options = {
      qs: {
        appid: CURRENT_UVI_API_KEY,
        lat: coordinates.lat,
        lon: coordinates.lon
      }
    }

    const currentUvResponse = await get(CURRENT_UVI_URI, options)
    const uvi = JSON.parse(currentUvResponse).value

    return uvi
  }
}
