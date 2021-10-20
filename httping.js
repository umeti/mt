
const cli = require("cli")
const axios = require('axios')

cli.setApp("mt httping")
const option = cli.parse({
  timeout:['t',"超时时间",'float',3.0]
})

async function main(){ 
  let show_url = decodeURI(cli.args[1])
  let url = encodeURI(show_url)
  if(!/https?:/.test(url)){
    url = "https://"+url
  }
  while(true){
    let t1 = new Date().getTime()
    let res
    let status
    try {
      res = await axios.head(url,{
      timeout:option.timeout * 1000
    })
      status = res.status
    }catch(e){
      status = e
    }
    let t2 = new Date().getTime()
    console.log(` ${((t2-t1)/1000).toPrecision(3)}s ${status} ${url}`)

    
    await later(1000)
  }
  
}

function later(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}


main()
