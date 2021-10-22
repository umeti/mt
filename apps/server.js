const daemon = require("daemon")

let pid = daemon.daemon(__dirname+'/../server.js',[],{
  cwd:process.cwd(),
  env:process.env,
  stdout:process.stdout,
  stderr:process.stderr,
});
 
console.log(process.pid);
