import { Router as ExpressRouter } from "express"
import { WeatherController } from './controllers/weatherController'

const weatherController = new WeatherController()

export class Router {

  expressRouter: ExpressRouter = ExpressRouter()

  constructor() {
    this.setupRoutes()
  }

  private setupRoutes() {
    this.expressRouter.get('/v1/weather', weatherController.getWeather)
  }
}
