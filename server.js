const daemon = require("daemon")

let pid = daemon.daemon(__dirname+'/server/main.js',[],{
  cwd:process.cwd(),
  env:process.env,
  stdout:process.stdout,
  stderr:process.stderr,
});
 
console.log(process.pid);
