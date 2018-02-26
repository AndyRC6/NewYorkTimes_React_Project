import axios from "axios";

export default {
  getArticles: function(query) {
    return axios.get(`/getArticles/${query}`);
  },
  getSavedArticles: function(){
    return axios.get("/Articles");
  },
  saveArticle: function(article){
    return axios.post("/Articles", article);
  },
  deleteArticle: function(id) {
    return axios.delete(`/Articles/${id}`);
  }

};
