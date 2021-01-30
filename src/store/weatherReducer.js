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
      const response = await axios.get(`/weather?q=${cityName}`)
      const cities = getState().weather.citiesWeather
      const checked = checkRepeatCity(cities, response)

      if(!checked) {
        dispatch(setWeather(response))
      } else {
        notification.warn({
          message: 'Пердупреждение',
          description: 'Этот город уже добавлен',
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error search',
        description: err.message,
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
