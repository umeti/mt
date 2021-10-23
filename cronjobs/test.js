

function tick(ctx,log){
  log.info("任务主体")
}

function stop(){
  console.log("任务终止")
}

module.exports = {tick,stop}
