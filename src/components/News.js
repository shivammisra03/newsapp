import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResult] = useState(0)

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    useEffect(() => {
        updatePage()
        document.title = `${capitalize(props.category)} + ' - NewsMonkey'`
    }, [])

    // async componentDidMount() {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=1&pageSize=${props.pageSize}`;
    //     // this.setState({ loading: true })
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // console.log("parsed data :", parsedData)
    //     // this.setState({ 
    //     //     articles: parsedData.articles, 
    //     //     totalResults: parsedData.totalResults, 
    //     //     loading: false })

    //     this.updatePage()

    // }

    const handlePrevChange = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=${page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     loading: false,
        //     page: page - 1,
        //     articles: parsedData.articles
        // })
        setPage(page - 1)
        updatePage()
    }

    const allResultsShown = () => {
        return page + 1 > Math.ceil(totalResults / props.pageSize)
    }

    const handleNextChange = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=97b727ed6f9f4c4c96f60ae2a43669f7&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     loading: false,
        //     page: page + 1,
        //     articles: parsedData.articles
        // })
        setPage(page + 1)
        updatePage()

    }

    const updatePage = async () => {
        console.log("State Page: ", page);
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        console.log("parsed data :", parsedData)
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    const fetchMoreData = async () => {
        console.log("State Page: ", page);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log("parsed data :", parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResult(parsedData.totalResults)
    };


    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>News Monkey - Top {capitalize(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.indianexpress.com/2022/01/mars-1.jpg"}
                                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={page <= 1} className="btn btn-success" onClick={this.handlePrevChange}> &larr; Previous</button>
                    <button type="button" disabled={this.allResultsShown()} className="btn btn-success" onClick={this.handleNextChange}>Next &rarr; </button>
                </div> */}
        </>
    )

}

News.defaultProps = {
    country: "in",
    pageSize: 8

}

News.propTypes = {
    name: PropTypes.string,
    category: PropTypes.string
}

export default News

