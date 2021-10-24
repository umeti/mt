const Datastore = require('nedb')

const db = new Datastore({
  filename: __dirname + '/../data/data.db',
  autoload: true
});

db.find({type:'test','data.deviceCategory':'mobile'},(err,docs)=>{
  console.log(docs);
})