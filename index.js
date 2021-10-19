
let app = process.argv[2]
try {
  require(`${__dirname}/${app}.js`)
}catch(e){
  console.log(e)
}
