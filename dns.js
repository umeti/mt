const { TCPClient,UDPClient,DOHClient } = require('dns2');
const cli = require("cli")

const SERVER = '1.1.1.1'

// https://1.1.1.1/dns-query?name=pixiv.net&type=A'
cli.setApp("mt dns")
const arg = cli.parse({
  server:['s','','string',SERVER],
  port:['p','','int',0],
  tcp:[false,'使用 tcp ','bool'],
  dot:[false,'使用 tcp ','bool'],
  doh:[false,'使用 doh ','bool']
})


async function main(){
  let opt = {
    dns: arg.server
  }
  if(arg.port){
    opt.port = arg.port
  }
  let resolve

  if(arg.tcp){
    resolve = TCPClient(opt);
  }else if(arg.doh){
    resolve = DOHClient(opt)
  }else{
    resolve = UDPClient(opt);
  }

  let domain = cli.args[1]
  try {
    const result = await resolve(domain);
    for(let _ of result.answers){
      let s = `(${_.type}) `
      s += _.address || _.domain
      console.log(s)
    }
  } catch(error) {
    console.log(error);
  }

}

async function test() {
  try {
    const result = await resolve('github.com');
    console.log(result.answers);
  } catch(error) {
    console.log(error);
  }
}

main()
