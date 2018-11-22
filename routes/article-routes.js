module.exports = function (app){
    var article = require('./../controllers/article-controllers.js');
    
    app.get('/new-article', article.new);
    
    app.post('/article/create', article.create);
    
    
    app.get('/article/list', article.list);
    
    app.get('/article/:articleID', article.single);
}