import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#ffd24d'
            progress={this.state.progress}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={6} coutry="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={6} coutry="in" category="business" />} />
            < Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} coutry="in" category="entertainment" />} />
            < Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={6} coutry="in" category="health" />} />
            < Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={6} coutry="in" category="science" />} />
            < Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={6} coutry="in" category="sports" />} />
            < Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={6} coutry="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}