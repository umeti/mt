const cron = require('cron')
const Koa = require('koa');

let crontab = [{
  task: 'test',
  time: '* * * * * *',
}]

// 加载任务
let cronModule = {}
for(let _ of crontab){
  let m = require(`${__dirname}/cronjobs/${_.task}.js`)
  cronModule[_.task] = m
}

let cronjobs = []
for(let _ of crontab){
  let m = cronModule[_.task]
  let job = new cron.CronJob(
    _.time,
    ctx => {
      console.log(`定时任务 ${_.task} 触发`)
      m.tick(ctx)
      console.log(`定时任务 ${_.task} 完成`)
    },
    m.stop,
    true, // 立即start()
    'Asia/Shanghai',
    undefined, // context
  )
  cronjobs.push(job)
}


/*
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function() {
    console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
job.start();
*/



const koapp = new Koa();
koapp.use(async ctx => {
  ctx.body = 'Hello World';
});

koapp.listen(3000);
