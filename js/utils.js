import { config } from './config.js'

/**
 * It takes a string as an argument, and returns the element with the id that
 * matches the string
 * @param {string} selector - The ID of the element you want to select.
 * @returns {HTMLElement} - The element with the matching ID.
 */
export const $ = selector => document.querySelector(selector)

/**
 * It fetches data from the API and returns it as JSON
 * @param {string} url - The url of the API endpoint you want to call.
 * @returns {Promise<Object<string,any>>} The data is being returned as a JSON object.
 */
export const fetcher = async location => {
  const data = await fetch(`${config.ApiUrl}?q=${location}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': config.ApiHost,
      'X-RapidAPI-Key': config.ApiKey,
    },
  })
  return await data.json()
}

/**
 * If the browser supports geolocation, get the user's location and resolve it as a
 * string. If the browser doesn't support geolocation, resolve the string 'auto:ip'
 * @returns {Promise<string>} A promise that resolves to a string with the user coordinates.
 * @example const location = await getLocation()
 */
export const useLocation = async () => {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve(`${coords.latitude},${coords.longitude}`),
        () => resolve('auto:ip'),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    } else {
      resolve('auto:ip')
    }
  })
}

/**
 * It returns the user's language, or 'en' if it can't find it
 * @returns {Promise<string>} A promise that resolves to the language of the browser.
 */
export const useLanguage = async () => {
  return new Promise(resolve => {
    if (navigator.language) {
      resolve(navigator.language.split('-')[0])
    } else {
      resolve('en')
    }
  })
}

/**
 * It takes a component and renders it to the DOM
 * @param {object} app - The app component that we want to render.
 */
export const render = app => {
  $('#app').innerHTML = null
  $('#app').appendChild(app)
}
