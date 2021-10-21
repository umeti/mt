
const cli = require("cli")
const axios = require('axios')
const UserAgent = require('user-agents')

cli.setApp("mt httping")
const option = cli.parse({
  timeout:['t',"超时时间",'float',10.0]
})

async function main(){ 
  let show_url = decodeURI(cli.args[1])
  let url = encodeURI(show_url)
  if(!/https?:/.test(url)){
    url = "https://"+url
  }
  while(true){
    let msg
    try {
      let t1 = new Date().getTime()
      let res = await axios.head(url,{
      timeout:option.timeout * 1000,
      validateStatus:null,

      headers:{
        'user-agent':new UserAgent().toString()
      }
    })
      let t2 = new Date().getTime()
      url = res.request.res.responseUrl
      msg = `${((t2-t1)/1000).toPrecision(3)}s ${res.status}`
    }catch(e){
      msg = e
    }

    console.log(` ${msg} ${decodeURI(url)}`)
    
    await later(1000)
  }
  
}

function later(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}


main()
