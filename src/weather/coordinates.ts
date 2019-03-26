import { get } from 'request-promise-native'

const COORDINATES_URI = 'http://api.opencagedata.com/geocode/v1/json'
const COORDINATES_API_KEY = process.env.OPEN_CAGE_DATA_API_KEY

export interface Coordinates {
  lat: number
  lon: number
}

export class CoordinatesManager {
  static async getCoordinates(address: string): Promise<Coordinates> {
    const options = {
      qs: {
        q: address,
        key: COORDINATES_API_KEY
      }
    }

    // starting the request
    const coordinatesPromise = get(COORDINATES_URI, options)

    // pausing the code execution to wait for response
    const coordinatesResponse = await coordinatesPromise

    // should be careful with calling JSON.parse() on very large json, it will block the vent loop (here it's not a concern)
    const geometry = JSON.parse(coordinatesResponse).results[0].geometry

    return {
      lat: geometry.lat,
      lon: geometry.lng
    }
  }
}
