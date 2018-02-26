var articleController = require("../controllers/articles");

module.exports = function(app){
    app.get("/getArticles/:searchQuery", function(req, res){
        articleController.searchArticle(req, res);
    });

    app.post("/Articles", function(req, res){
        articleController.saveArticle(req, res);
    })

    app.get("/Articles", function(req, res){
        articleController.getSavedArticles(req, res);
    })

    app.delete("/Articles/:id", function(req, res){
        articleController.removeArticle(req, res);
    })

    
}