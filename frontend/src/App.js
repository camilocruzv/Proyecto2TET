import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Login from './components/Login';
import SignUp from './components/SignUp';
import TweetsList from './components/TweetsList';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/tweets" component={TweetsList}/>
      <Route path="/search" component={Search}/>
    </Router>
  );
}

export default App;
