import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App= () => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY

  const [progress, setProgress] = useState(0)
  
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#ffd24d'
            progress={progress}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} coutry="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={6} coutry="in" category="business" />} />
            < Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={6} coutry="in" category="entertainment" />} />
            < Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={6} coutry="in" category="health" />} />
            < Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={6} coutry="in" category="science" />} />
            < Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={6} coutry="in" category="sports" />} />
            < Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={6} coutry="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  
}

export default App;