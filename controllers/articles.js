var axios = require('axios');
var articles = require("../models/Article");
var request

module.exports = {

    searchArticle: function(req, res) {
        var query = req.params.searchQuery;
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cc2c1cdd41d04dfa9228e2c7213bfbdc&q=" + query;
        // console.log(url);
        axios({
            method: "GET",
            url: url,
            responseType: "json"
        }).then(function(articles){
            // console.log(articles);
            res.json(articles.data);
        }).catch(function(err){
            if(err) console.log(err);
        })
    },
    getSavedArticles: function(req, res) {
        articles.find({}, function(err, articles){
            if(err) throw err;
            res.json(articles);
        })
    },
    saveArticle: function(req, res){
        console.log(req.body);
        const newArticleObj = new articles(req.body);  
        newArticleObj.save(err => {  
            if (err) return res.status(500).send(err);
            return res.status(200).send(newArticleObj);
});
        // articles.create(req.body, function(err, dbModel){
        //     if (err) throw err;
        //     res.json(dbModel);
        // })
    },
    removeArticle: function(req, res) {
        articles.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) throw err;
            res.json({success: true});
        })
    }
}