const UserAgent = require('user-agents')
const Datastore = require('nedb')

/**
 * cron job on tick
 * @param context - this CronJob object
 * @param log - logger handle
 * @param {Datastore} db - database handle
 */
async function tick(ctx,log,db){
  log.info("测试任务")
  db.insert({type:'test',data:new UserAgent().data})
}

function stop(){
  console.log("任务终止")
}

module.exports = {tick,stop}
