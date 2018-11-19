var http = require('http');
var  express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');

var mongo= require ('mongodb');

//for c9
var db;
var db_url= "mongodb://"+process.env.IP+"27017";    //for local: comment out this line and write: var db_url: "mongodb://localhost:27017"
mongo.MongoClient.connect(db_url, {useNewUrlParser:true}, function(err, client){
  if(err)
  {
    console.log('Could not connect to MongoDB');
  }
  else
  {
    db= client.db('node-cw9');
  }
})

var save= function (form_data){
  db.createCollection ('articles', function(err, collection){
    
  });
  var collection = db.collection('articles');
  collection.save (form_data);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', function(request, response){ /*'/' means root route*/
  response.sendFile(__dirname+'/index.html');   /*__dirname is the root address*/
});

app.get('/about-page', function(request, response){ /*'/' means root route*/
  response.sendFile(__dirname+'/about.html');   /*__dirname is the root address*/
});

app.get('/new-article', function(request, response){ /*'/' means root route*/
  response.sendFile(__dirname+'/form.html');   /*__dirname is the root address*/
});

var article = [];

app.post('/article/create', function(request, response){
  console.log(request.body);
  if(!request.body.title){
    return response.status(400).json({error:"Please add a title"});
  }
  // article.push(request.body);
  save(request.body)
  return response.status(200).json({message: "Article successfully created"});
});

app.get('/article/list', function(request, response) {
   return response.status(200).json({articles: article}); 
});

article.push({title:"Test article 1", content:"content 1"});
article.push({title:"Test article 2", content:"content 2"});

app.get('/article/:articleID', function(request, response){   //:articleID is a variable
    response.render('../article.ejs', {
      article: article[request.params.articleID]
    })
});

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




