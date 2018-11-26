var Article = require('./../models/Article.js');

module.exports.new = function (request, response){
    response.render ('form.ejs');   /*__dirname is the root address*/
}

module.exports.create = function(request, response){
    //new article for mongoose
    var new_article = new Article (request.body);
      
    new_article.save (function(err, data){
    if(err){
        console.log(err)
    }
    return response.status(400).json({error:"Please add a title"});
    console.log(data);
    return response.status(200).json({message: "Article successfully created"});
    });
      
    console.log(request.body);
    //for mongoDB
    // if(!request.body.title){
    //   return response.status(400).json({error:"Please add a title"});
    // }
    // // article.push(request.body);
    // //save for mongoDB
    // //save(request.body)
    // return response.status(200).json({message: "Article successfully created"});
};

// var article= [{
//     title:"Test article 1", 
//     content:"content 1"
// }];

module.exports.list = function(request, response) {
   Article.find(function(err, data){
       if(err)
        response.status(400).json({
            error: "Database query error"
        })
       
       response.status(200).json({
           articles: data
       });
   });
};

module.exports.single = function(request, response){   //:articleID is a variable
    Article.findOne ({_id:request.params.articleID}), 
        function(err, data){
            if(err)
                response.status(400).json({
                    error: "Database query error"
                });
            
           response.render ('Article.js', {
               article:data
           }) 
    //     });
    // response.render('../article.ejs', {
    //      article: article[request.params.articleID]
    }
};