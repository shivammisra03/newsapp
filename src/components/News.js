import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8

    }

    static propTypes = {
        name: PropTypes.string,
        category: PropTypes.string
    }
    constructor() {
        super()
        console.log("Hello im a constructor")
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false
        }

    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log("parsed data :", parsedData)
        // this.setState({ 
        //     articles: parsedData.articles, 
        //     totalResults: parsedData.totalResults, 
        //     loading: false })

       this.updatePage()

    }

    handlePrevChange = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     loading: false,
        //     page: this.state.page - 1,
        //     articles: parsedData.articles
        // })

        this.setState({ page: this.state.page - 1 }, () => this.updatePage())
    }

    allResultsShown = () => {
        return this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
    }

    handleNextChange = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     loading: false,
        //     page: this.state.page + 1,
        //     articles: parsedData.articles
        // })
        this.setState({ page: this.state.page + 1 }, () => this.updatePage())

    }

    updatePage = async () => {
        console.log("State Page: ", this.state.page);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log("parsed data :", parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>News Monkey - Top Headline</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.indianexpress.com/2022/01/mars-1.jpg"}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-success" onClick={this.handlePrevChange}> &larr; Previous</button>
                    <button type="button" disabled={this.allResultsShown()} className="btn btn-success" onClick={this.handleNextChange}>Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News

