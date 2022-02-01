import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8

    }
    capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
    static propTypes = {
        name: PropTypes.string,
        category: PropTypes.string
    }
    constructor(props) {
        super(props)
        console.log("Hello im a constructor")
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false
        }
        document.title = this.capitalize(this.props.category) + ' - NewsMonkey'

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
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        console.log("parsed data :", parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        console.log("State Page: ", this.state.page);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log("parsed data :", parsedData)
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>News Monkey - Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.indianexpress.com/2022/01/mars-1.jpg"}
                                        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-success" onClick={this.handlePrevChange}> &larr; Previous</button>
                    <button type="button" disabled={this.allResultsShown()} className="btn btn-success" onClick={this.handleNextChange}>Next &rarr; </button>
                </div> */}
            </>
        )
    }
}

export default News

