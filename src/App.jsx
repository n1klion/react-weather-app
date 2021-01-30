import { useDispatch, useSelector } from 'react-redux'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'
import Search from './components/Search'
import { getWeather, deleteCity, updateWeather } from './store/weatherReducer'
import { notification, Col } from 'antd'

import './App.less'

function App() {
  const dispatch = useDispatch()

  const isLoaded = useSelector((state) => state.weather.isLoaded)
  const data = useSelector((state) => state.weather.citiesWeather)

  function onSearchHandler(value) {
    if (value) {
      dispatch(getWeather(value))
    } else {
      notification.info({
        message: 'Info',
        description: 'Введите город для поиска',
      })
    }
  }

  function deleteCityFromList(id) {
    dispatch(deleteCity(id))
  }

  function updateCity(name) {
    dispatch(updateWeather(name))
  }

  function dataList() {
    if (data.length) {
      return data.map((city, index) => (
        <WeatherCard
          updateCity={updateCity}
          deleteCityFromList={deleteCityFromList}
          weather={city}
          key={index}
        />
      ))
    } else {
      return (
        <div style={{ fontSize: '1.2rem', lineHeight: 1.2, color: '#bfbfbf' }}>
          Список пуст...
        </div>
      )
    }
  }

  return (
    <>
      {!isLoaded && <Loader />}
      <Col span={12} offset={6} className="container-wrap">
        <Search onSearchHandler={onSearchHandler} />
        {dataList()}
      </Col>
    </>
  )
}

export default App
