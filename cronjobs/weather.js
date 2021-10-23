const axios = require('axios')

async function tick(ctx,log){
  let res = await axios.get('http://t.weather.itboy.net/api/weather/city/101280101')
  log.info(res.data)
}

function stop(){

}

module.exports = {tick,stop}
