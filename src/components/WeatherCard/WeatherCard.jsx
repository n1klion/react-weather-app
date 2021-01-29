import classes from './WeatherCard.module.css'
import firstLetterCaps from '../../helpers/firstLetterCaps'
import { Card, Fade } from 'react-bootstrap'

function WeatherCard({ weather }) {
  const nameCity = weather.name
  const icon = weather.weather[0].icon
  const iconAlt = weather.weather[0].main
  const temp = Math.round(weather.main.temp)
  const description = firstLetterCaps(weather.weather[0].description)
  const feelsLike = Math.round(weather.main.feels_like)
  return (
    <Fade in={true}>
      <Card className={classes['weather-card-wrap']}>
        <div className={classes['weather-card-body']}>
          <h3 className={classes['weather-title']}>{nameCity}</h3>
          <div className={classes['weather-degree-details']}>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={iconAlt} />
            <span className={classes['weather-degree']}>{temp}&#176;C</span>
          </div>
          <p className={classes['weather-clouds']}>{description}</p>
          <p className={classes['weather-feelslike']}>
            Ощущается как: {feelsLike}&#176;C
          </p>
        </div>
      </Card>
    </Fade>
  )
}

export default WeatherCard
