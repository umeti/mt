const axios = require('axios')

async function tick(ctx, log,db) {
  let res;
  try {
    log.info('请求天气数据...')
    res = await axios.get('http://t.weather.itboy.net/api/weather/city/101280101',{
      timeout:3000
    })
    log.info('缓存天气数据')
    db.insert({type:'weather',data:res.data})
  } catch (err) {
    log.error(err)
    log.debug(res)
  }
}

function stop() {

}

module.exports = { tick, stop }
