import React from "react";
import API from "../utils/API";
import ReactLoading from 'react-loading';


class Saved extends React.Component {
    state = {
        articles: [],
        loading: false
    };

    getAllSavedArticles = () => {
        this.setState({
            loading: true
        })
        API.getSavedArticles()
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                    articles: res.data
                })
            })
    }

    componentDidMount () {
        this.getAllSavedArticles();
    };

    handleDelete = event => {
        event.preventDefault();
        API.deleteArticle(event.target.getAttribute("data-id"))
        .then(res => {
            this.getAllSavedArticles();
        })
    }

    render () {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3>Saved Articles</h3>
                    </div>
                    <div className="panel-body">
                        {this.state.loading == false ? this.state.articles.map(article => 
                            <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-11">
                                <a href={article.web_url}><h4>{article.headline.main}</h4></a>
                                        <p>{article.snippet}</p>
                                </div>
                                <div className="col-md-1">
                                    <button onClick={this.handleDelete} data-id={article._id} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                        ) : <ReactLoading type="spin" color="green" height='50px' width='50px' className="center-block" />}
                    </div>
                </div>
            </div>
        );
    }
};

export default Saved;