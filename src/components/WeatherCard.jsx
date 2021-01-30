import firstLetterCaps from '../helpers/firstLetterCaps'
import { Card } from 'antd'
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import Details from './Details'

function WeatherCard({ weather, deleteCityFromList, updateCity }) {
  const nameCity = weather.name
  const icon = weather.weather[0].icon
  const iconAlt = weather.weather[0].main
  const temp = Math.round(weather.main.temp)
  const description = firstLetterCaps(weather.weather[0].description)
  const feelsLike = Math.round(weather.main.feels_like)
  const details = weather.weather_of_24_hours

  return (
    <Card className={'weather-card-wrap'}>
      <CloseOutlined
        onClick={() => deleteCityFromList(weather.id)}
        className="weather-card-close"
      />
      <ReloadOutlined onClick={() => updateCity(nameCity)} className="weather-card-reload" />
      <h3 className="weather-title">{nameCity}</h3>
      <div className="weather-degree-details">
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={iconAlt} />
        <span className="weather-degree">{temp}&#176;C</span>
      </div>
      <p className="weather-clouds">{description}</p>
      <p className="weather-feelslike">Ощущается как: {feelsLike}&#176;C</p>
      <Details details={details} />
    </Card>
  )
}

export default WeatherCard
