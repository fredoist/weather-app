import SWR from 'https://esm.sh/vanilla-swr?pin=v85'
import html from 'https://esm.sh/nanohtml?pin=v85'
import rain from 'https://esm.sh/make-it-rain-js?pin=v85'
import {
  fetcher,
  generateGradient,
  render,
  useLanguage,
  useLocation,
} from './utils.js'
import { drizzle, rainy } from './condition-codes.js'

document.addEventListener('DOMContentLoaded', async () => {
  const location = await useLocation()
  const language = await useLanguage()
  const observable = SWR(location, fetcher)
  observable.watch(({ data }) => {
    if (data) {
      const { location, current } = data
      if ([...rainy, ...drizzle].includes(current.condition.code)) {
        rain().startAnimation()
      }

      const gradient = generateGradient(current.condition)
      document.body.style = gradient

      const stats = [
        { icon: 'wind', value: `${current.wind_mph} mph` },
        { icon: 'humidity', value: `${current.humidity}%` },
        { icon: 'pressure', value: `${current.pressure_in} in` },
      ]

      const App = html`
        <section class="weather">
          <span class="temperature">${current.temp_f}°</span>
          <span class="condition">${current.condition.text}</span>
        </section>
        <section class="details">
          <h1 class="location">${location.name}</h1>
          <time class="date" datetime="${location.localtime.split(' ')[0]}">
            ${new Date(location.localtime).toLocaleDateString(language, {
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <time class="time" datetime="${location.localtime.split(' ')[1]}">
            ${new Date(location.localtime).toLocaleTimeString(language, {
              hour: 'numeric',
              minute: 'numeric',
              hourCycle: 'h12',
            })}
          </time>
          <ul>
            ${stats.map(
              ({ icon, value }) => html`
                <li class="stats">
                  <img src="/img/icons/${icon}.svg" alt="${icon}" />
                  <span>${value}</span>
                </li>
              `
            )}
          </ul>
        </section>
      `

      document.title = `Weather forecast in ${location.name}, ${location.country}`
      render(App)
    }
  })
})
