var http = require('http');
var  express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongoose= require ("mongoose");


// var mongo= require ('mongodb');
var Article = require('./models/Article.js');

//for c9
var db;
var db_url= "mongodb://" + process.env.IP + ":27017";    //for local: comment out this line and write: var db_url: "mongodb://localhost:27017"


/*MongoDB code; classword 9a*/
// mongo.MongoClient.connect(db_url, {useNewUrlParser:true}, function(err, client){
//   if(err)
//   {
//     console.log('Could not connect to MongoDB');
//   }
//   else
//   {
//     db= client.db('node-cw9');
//   }
// })

// Mongoose code; classwork 9b
// var mongoose= require ("mongoose");

mongoose.connect(db_url+"/node-cw9");
mongoose.connection.on('error', function(){
  console.log(err);
  console.log('Could not connect to mongodb');
});

// var Schema = mongoose.Schema;

// var articleSchema = new Schema({
//   title:{
//     type: String,
//     required: "Title required"
//   },
//   content: {
//     type: String
//   }
// });

// var Article = mongoose.model('Article', articleSchema);


var save= function (form_data){
  db.createCollection ('articles', function(err, collection){
    
  });
  var collection = db.collection('articles');
  collection.save (form_data);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', function(request, response){ /*'/' means root route*/
  response.render('index.ejs');   /*__dirname is the root address*/
});

app.get('/about-page', function(request, response){ /*'/' means root route*/
  response.sendFile('about.ejs');   /*__dirname is the root address*/
});


require('./routes/article-routes.js')(app);

server.listen(process.env.PORT, /* || 3000 (for local host)*/ process.env.IP, /* || 'localhost' */ function(){
  console.log('Server running');
});

  
// var fs= require('fs');

//   var server = http.createServer(function(req, res){
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     fs.readFile('index.html', function (err, data){
//       if (err){
//         return console.log("File read error");
//       }  
//       res.end(data);
//     });
//     //res.end("Hello World\n");
//   });
  // server.listen(process.env.PORT, /* || 3000 (for local host)*/ process.env.IP, /* || 'localhost' */ function(){
  //   console.log('Server running');
  // });




