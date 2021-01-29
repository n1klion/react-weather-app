import classes from './App.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import WeatherCard from './components/WeatherCard/WeatherCard'
import Loader from './components/Loader/Loader'
import Search from './components/Search/Search'
import Message from './components/Message/Message'
import { getWeather } from './store/weatherReducer'
import { setMessage } from './store/notifyReducer'

function App() {
  const dispatch = useDispatch()

  const isLoaded = useSelector((state) => state.weather.isLoaded)
  const data = useSelector((state) => state.weather.citiesWeather)
  const notifyMessage = useSelector((state) => state.notify.messagePool)

  function onSearchHandler(value) {
    if(value){
      dispatch(getWeather(value))
    } else {
      dispatch(setMessage({
        id: Date.now(),
        msg: 'Прежде чем добавить - введите город',
        title: 'Info',
        variant: 'message-info',
      }))
    }
  }

  function messageList() {
    if (notifyMessage) {
      return notifyMessage.map(item => (
        <Message
          msg={item.msg}
          title={item.title}
          variant={item.variant}
          id={item.id}
          key={item.id}
        />
      ))
    }
    return
  }

  function dataList() {
    if (data.length) {
      return data.map((city, index) => <WeatherCard weather={city} key={index} />)
    } else {
      return <div className={classes['container-empty']}>List is empty...</div>
    }
  }

  return (
    <>
      <div className={classes['message-toast-wrap']}>{messageList()}</div>

      <Container className={classes['container-wrap']}>
        <Search onSearchHandler={onSearchHandler} />
        {isLoaded ? dataList() : <Loader />}
      </Container>
    </>
  )
}

export default App
