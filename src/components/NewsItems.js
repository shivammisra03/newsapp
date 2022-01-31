import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {

    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{ display: 'flex', left: '0', position: 'absolute' }}>
            <span className="badge rounded-pill bg-success">
              {source}</span>
          </div>

          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}{title.length < 45 ? "" : "..."}</h5>
            <p className="card-text">{description}{description.length < 88 ? "" : "..."}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-success">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
