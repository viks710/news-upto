import React, { Component } from 'react'
import Newsitem from './Newsitem'
import newlyimage from "./newlyimage.png"
import Spinner from './Spinner';


export default class News extends Component {
    articles = [];

    
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    };
    
    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=fba5bc104125411380e64dd3566456ea&pagesize=6&page=1'
        // let url = 'https://newsdata.io/api/1/sources?apikey=pub_1788449600a107e43b9bb58616b2b25da6c63&country=in&pagesize=6&page=1'
        let data = await fetch(url)

        let formjson = await data.json();

        this.setState({
            articles: formjson.articles,
            totalarticles: formjson.totalResults
        })
    }

    Backpage = async () => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.setState({
            page: this.state.page - 1,
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=fba5bc104125411380e64dd3566456ea&pagesize=6&page=${this.state.page - 1}`
        let data = await fetch(url)

        let formjson = await data.json();

        this.setState({
            articles: formjson.articles,
            loading: false
        })
        
    }

    Nextpage = async () => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        this.setState({
            page: this.state.page + 1,
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=fba5bc104125411380e64dd3566456ea&pagesize=6&page=${this.state.page + 1}`
        let data = await fetch(url)

        let formjson = await data.json();

        this.setState({
            articles: formjson.articles,
            loading: false
        })
    }


    render() {


        return (
            <div className='container my-3'>
                <h2 className=' text-center'> NewsDaily - Get today's top headlines</h2>

                {this.state.loading && <Spinner />}

                <div className='row my-4 '>
                    {this.state.articles.map((element) => {
                        return <div className=' text-center col-md-4 my-2' key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} Urlimage={element.urlToImage ? element.urlToImage : (newlyimage)}
                                Urlread={element.url} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.Backpage}> &larr;Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalarticles / 6)} type="button" className="btn btn-dark" onClick={this.Nextpage}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
