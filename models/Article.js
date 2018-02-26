const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String
    },
    snippet: {
        type: String
    },
    web_url: {
        type: String
    }

});


var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

