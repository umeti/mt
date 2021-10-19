const cli = require("cli")

async function main(){
  let s = cli.args.join(', ')
  console.log("Hello, "+s)
}

main()
