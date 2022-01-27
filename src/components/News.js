import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
    render() {
        return (
            <div className='container my-3'>
                <h2>News Monkey - Top Headline</h2>
                <div className="row">
                    <div className="col-md-4">
                        <NewsItems title="myTitle" description="hi" />
                    </div>
                    <div className="col-md-4">
                        <NewsItems title="myTitle" description="hi" />
                    </div>
                    <div className="col-md-4">
                        <NewsItems title="myTitle" description="hi" />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default News
