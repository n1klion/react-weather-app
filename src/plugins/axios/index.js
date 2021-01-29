import axios from 'axios'
import interceptors from './interceptors'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

interceptors(instance)

export default instance
