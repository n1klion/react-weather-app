import { Tabs } from 'antd'
import firstLetterCaps from '../helpers/firstLetterCaps'

const { TabPane } = Tabs

function Details({ details }) {
  function tabPane() {
    return details.list.map((item, index) => {
      const time = new Date(item.dt_txt).getHours()
      const img = item.weather[0].icon
      const alt = item.weather[0].main
      const description = firstLetterCaps(item.weather[0].description)
      const temp = Math.round(item.main.temp)
      const tempMin = Math.round(item.main.temp_min)
      const tempMax = Math.round(item.main.temp_max)
      const feelsLike = Math.round(item.main.feels_like)
      return (
        <TabPane tab={time} key={index}>
          <div className="details-wrap">
            <div className="details-weather">
              <img src={`http://openweathermap.org/img/wn/${img}.png`} alt={alt} />
              <span className="weather-description">{description}</span>
            </div>
            <div className="details-temp">
              <h3 className="temp-degree">{temp}&#176;C</h3>
              <span className="temp-max-min">
                max:{tempMax}&#176; min:{tempMin}&#176;
              </span>
              <span className="temp-feelslike">Ощущается как: {feelsLike}&#176;C</span>
            </div>
          </div>
        </TabPane>
      )
    })
  }

  return (
    <Tabs
      className="tabs-wrap"
      defaultActiveKey="0"
      animated={{ inkBar: true, tabPane: true }}
    >
      {tabPane()}
    </Tabs>
  )
}

export default Details
