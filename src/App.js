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


export default class App extends Component {
  c = 'Shivam'
  render() { 
    return (  
      <div>  
        <Router> 
          <NavBar /> 
  
           <Routes> 
            <Route exact path="/" element={<News key="general" pageSize={6} coutry="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" pageSize={6} coutry="in" category="business" />}/> 
            < Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} coutry="in" category="entertainment" />}/> 
            < Route exact path="/health" element={<News key="health" pageSize={6} coutry="in" category="health" />}/> 
            < Route exact path="/science" element={<News key="science" pageSize={6} coutry="in" category="science" />} /> 
            < Route exact path="/sports" element={<News key="sports" pageSize={6} coutry="in" category="sports" />}/> 
            < Route exact path="/technology" element={<News key="technology" pageSize={6} coutry="in" category="technology" />} /> 
          </Routes>
        </Router>
      </div>
    )
  }
}