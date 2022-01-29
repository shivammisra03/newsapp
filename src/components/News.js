import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
    
    constructor() {
        super()
        console.log("Hello im a constructor")
        this.state = {
            articles: [],
            page : 1,
            totalResults : 0
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=1&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log("parsed data :", parsedData)
        this.setState({ articles: parsedData.articles, totalResults : parsedData.totalResults})

    }

    handlePrevChange = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    allResultsShown = () => {
        return this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
    }

    handleNextChange = async () => {

        if(this.allResultsShown()){
            console.log("All results shown")
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json()
        this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
        
    }

    render() {
        return (
            <div className='container my-3'>
                <h1>News Monkey - Top Headline</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.indianexpress.com/2022/01/mars-1.jpg"}
                                newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevChange}> &larr; Previous</button>
                    <button type="button" disabled={this.allResultsShown()} className="btn btn-dark" onClick={this.handleNextChange}>Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News

