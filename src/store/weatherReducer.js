import { notification } from 'antd'
import axios from '../plugins/axios'

const WEATHER = 'weatherReducer/WEATHER'
const TOGGLE_LOADER = 'weatherReducer/TOGGLE_LOADER'
const DELETE_WEATHER = 'weatherReducer/DELETE_WEATHER'

const initialState = {
  isLoaded: true,
  citiesWeather: [],
}

function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case WEATHER: {
      return {
        ...state,
        isLoaded: true,
        citiesWeather: [...state.citiesWeather, action.payload],
      }
    }
    case TOGGLE_LOADER: {
      return {
        ...state,
        isLoaded: action.payload,
      }
    }
    case DELETE_WEATHER: {
      return {
        ...state,
        citiesWeather: state.citiesWeather.filter((city) => city.id !== action.payload),
      }
    }
    default:
      return state
  }
}

// Actions
function toggleLoader(bool) {
  return {
    type: TOGGLE_LOADER,
    payload: bool,
  }
}

function setWeather(data) {
  return {
    type: WEATHER,
    payload: data,
  }
}

export function deleteCity(id) {
  return {
    type: DELETE_WEATHER,
    payload: id,
  }
}

// Thunks
export function getWeather(cityName) {
  return async function (dispatch, getState) {
    try {
      dispatch(toggleLoader(false))
      const requestArr = [
        axios.get(`/weather?q=${cityName}`),
        axios.get(`/forecast?q=${cityName}&cnt=9`),
      ]
      const [weatherOfCity, weatherOf24Hourse] = await Promise.all(requestArr)
      const citiesList = getState().weather.citiesWeather
      const checked = checkRepeatCity(citiesList, weatherOfCity)

      const weatherDetail = { ...weatherOfCity, weather_of_24_hours: weatherOf24Hourse }

      if (!checked) {
        dispatch(setWeather(weatherDetail))
      } else {
        notification.warn({
          message: 'Пердупреждение',
          description: 'Этот город уже добавлен',
        })
      }
    } catch (err) {
      const msg = err.response.status === 404 ? 'Город не найден' : err.message
      notification.error({
        message: 'Ошибка',
        description: msg,
      })
    } finally {
      dispatch(toggleLoader(true))
    }
  }
}

// Helpers
function checkRepeatCity(cities, response) {
  if (cities.length) {
    return cities.some((city) => city.id === response.id)
  }
  return false
}

export default weatherReducer
