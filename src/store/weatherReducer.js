import axios from '../plugins/axios'
import { setMessage } from './notifyReducer'

const WEATHER = 'weatherReducer/WEATHER'
const TOGGLE_LOADER = 'weatherReducer/TOGGLE_LOADER'

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
        citiesWeather: [...state.citiesWeather, action.data],
      }
    }
    case TOGGLE_LOADER: {
      return {
        ...state,
        isLoaded: action.payload,
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
    data,
  }
}

// Thunks
export function getWeather(cityName) {
  return async function (dispatch) {
    try {
      dispatch(toggleLoader(false))
      const response = await axios.get(`/weather?q=${cityName}`)
      dispatch(setWeather(response))
    } catch (err) {
      dispatch(
        setMessage({
          id: Date.now(),
          msg: err.message,
          title: 'Error',
          variant: 'message-error',
        })
      )
    } finally {
      dispatch(toggleLoader(true))
    }
  }
}

export default weatherReducer
