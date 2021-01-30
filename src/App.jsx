import classes from './App.module.css'
import { useDispatch, useSelector } from 'react-redux'
import WeatherCard from './components/WeatherCard/WeatherCard'
import Loader from './components/Loader/Loader'
import Search from './components/Search/Search'
import { getWeather, deleteCity } from './store/weatherReducer'
import { notification, Col } from 'antd'

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

  function dataList() {
    if (data.length) {
      return data.map((city, index) => <WeatherCard deleteCityFromList={deleteCityFromList} weather={city} key={index} />)
    } else {
      return <div style={{fontSize: '1.2rem', lineHeight: 1.2, color: '#bfbfbf'}}>Список пуст...</div>
    }
  }

  return (
    <>
      <Col span={12} offset={6} className={classes['container-wrap']}>
        <Search onSearchHandler={onSearchHandler} />
        {isLoaded ? dataList() : <Loader />}
      </Col>
    </>
  )
}

export default App
