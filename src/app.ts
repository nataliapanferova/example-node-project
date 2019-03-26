import * as express from "express"

export class App {

  expressApp: express.Application

  constructor() {
    this.expressApp = express()
  }
}
