import React from "react";
import API from "../utils/API";
import ReactLoading from 'react-loading';
import Saved from "./saved";

class Search extends React.Component {
    state = {
        results: [],
        savedArticles: [],
        searchQuery: "",
        loading: false,
        key: 0
    }

    getArticles = event => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        API.getArticles(this.state.searchQuery)
            .then(res => {
                console.log(res.data.response.docs);
                this.setState({
                    loading: false,
                    results: res.data.response.docs
                })
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    handleSave = event => {
        event.preventDefault();
        API.saveArticle({
            headline: event.target.getAttribute("data-headline"),
            snippet: event.target.getAttribute("data-snippet"),
            web_url: event.target.getAttribute("data-url")
        })
        .then(res => {
            window.location.reload();
        })
    }

    render () {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3>Search</h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label>Search Query</label>
                                <input className="form-control" value={this.state.searchQuery} onChange={this.handleInputChange} name="searchQuery"></input>
                            </div>
                            <button type="submit" className="btn btn-default" onClick={this.getArticles}>Submit</button>
                        </form>
                    </div>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3>Results</h3>
                    </div>
                    <div className="panel-body">
                        {this.state.loading == false ? this.state.results.map(result =>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="col-md-11">
                                        <a href={result.web_url}><h4>{result.headline.main}</h4></a>
                                        <p>{result.snippet}</p>
                                    </div>
                                    <div className="col-md-1">
                                        <button onClick={this.handleSave} data-headline={result.headline.main} data-snippet={result.snippet} data-url={result.web_url} className="btn btn-success">Save</button>
                                    </div>
                                </div>
                            </div>
                        ): <ReactLoading type="spin" color="green" height='50px' width='50px' className="center-block" />}
                    </div>
                </div>

                <Saved />
            </div>

            
        );

    }
};


export default Search;