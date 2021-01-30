import classes from './WeatherCard.module.css'
import firstLetterCaps from '../../helpers/firstLetterCaps'
import { Card } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

function WeatherCard({ weather, deleteCityFromList }) {
  const nameCity = weather.name
  const icon = weather.weather[0].icon
  const iconAlt = weather.weather[0].main
  const temp = Math.round(weather.main.temp)
  const description = firstLetterCaps(weather.weather[0].description)
  const feelsLike = Math.round(weather.main.feels_like)
  return (
    <Card className={classes['weather-card-wrap']}>
      <h3 className={classes['weather-title']}>{nameCity}</h3>
      <CloseOutlined
        onClick={() => deleteCityFromList(weather.id)}
        className={classes['weather-card-close']}
      />
      <div className={classes['weather-degree-details']}>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={iconAlt} />
        <span className={classes['weather-degree']}>{temp}&#176;C</span>
      </div>
      <p className={classes['weather-clouds']}>{description}</p>
      <p className={classes['weather-feelslike']}>Ощущается как: {feelsLike}&#176;C</p>
    </Card>
  )
}

export default WeatherCard
