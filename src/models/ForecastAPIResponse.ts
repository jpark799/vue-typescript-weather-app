export interface ForecastAPIResponse {
  list: {
    dt: number
    dt_txt: string
    main: {
      temp: number
    }
    weather: {
      description: string
      icon: string
    }[]
  }[]
}