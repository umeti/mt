
let app = process.argv[2]
try {
  require(`${__dirname}/apps/${app}.js`)
}catch(e){
  console.log(e)
}
