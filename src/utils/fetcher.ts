import { useLocation } from "./useLocation"

export const fetcher = async (url: string) => fetch(url).then(res => res.json())

export const fetchWeather = async () => {
  const location = await useLocation()
  return fetcher(`/api/weather?q=${location}`)
}
