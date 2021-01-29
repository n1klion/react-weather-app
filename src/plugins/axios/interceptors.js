function setParams(config) {
  const params = config.params || {}
  config.params = Object.assign(params, {
    appid: process.env.REACT_APP_APPID,
    lang: 'ru',
    units: 'metric',
  })

  return config
}

function returnData(res) {
  return res.data
}

function interceptors(axios) {
  axios.interceptors.request.use(setParams)
  axios.interceptors.response.use(returnData)
}

export default interceptors
