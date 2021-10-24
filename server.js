const cron = require('cron')
const Koa = require('koa');
const bunyan = require('bunyan');
const yaml = require('yaml')
const Datastore = require('nedb')

const fs = require('fs')

const log = bunyan.createLogger({
  name: "mt",
  streams: [{
    path: __dirname+'/logs/server.log',
  }]
});

log.info('server up')

log.info({ event: 'load', data: 'config' })
const config = yaml.parse(fs.readFileSync(__dirname + '/config.yml', 'utf-8'))

let crontab = config.crontab

// 加载任务模块
let cronModule = {}
for (let _ of crontab) {
  if (_.off) continue;
  let name = `cronjobs/${_.task}.js`
  log.info({ event: 'load', module: name })
  try {
    let m = require(`${__dirname}/${name}`)
    cronModule[_.task] = m
  } catch (err) {
    log.error(_, err)
  }
}

log.info({event:'load',data:'database'})
const db = new Datastore({
  filename: __dirname + '/data/data.db',
  autoload: true
});

let cronjobs = []
for (let _ of crontab) {
  let m = cronModule[_.task]
  if (!m || _.off) continue;

  let job = new cron.CronJob(
    _.rule,
    async function () {
      let cronLog = log.child({
        event: 'cronjob',
        task: _.task,
        id: this.lastDate()
      })
      cronLog.info({ action: 'start' })
      try {
        await m.tick(this, cronLog,db)
        cronLog.info({ action: 'done' })
      } catch (err) {
        cronLog.error({ action: 'throw' }, err)
      }
    },
    m.stop, // TODO: 封装
    true, // 立即start()
    'Asia/Shanghai',
    //undefined, // context
  )
  cronjobs.push(job)
}

log.info('ready web server')
const koapp = new Koa();
koapp.use(async ctx => {
  ctx.body = 'Hello World';
});

koapp.listen(3000);
log.info('web server up')
