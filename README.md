# Example node.js server with express and typescript

The app can receive a request to `/v1/weather` with query `address` and will return the current weather data for the given address. 

It uses [opencagedata](https://opencagedata.com/) to get the coordinates for the address and [openweathermap](https://openweathermap.org/) to get the current weather and the current uvi.

It's using node version `v10.5.0`

## Running the server

Create a .env file in the route of the directory with the following variables:
```bash
export PORT=3000
export OPEN_CAGE_DATA_API_KEY={your api key}
export OPEN_WEATHER_MAP_API_KEY={your api key}
```

Run `npm run dev`
