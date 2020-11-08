// import logo from './logo.svg';
import './App.css';
import Menu from "./components/Menu";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Fitness from "./components/Fitness/Fitness"
import Light from "./components/Light/Light"
import Health from "./components/Health/Health"
import Food from "./components/Food/Food"
import Sleep from "./components/Sleep/Sleep"
import React from "react";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Switch>
            <Route exact path="/" component={Menu} />
            <Route exact path="/light" component={Light} />
            <Route exact path="/health" component={Health} />
            <Route exact path="/fitness" component={Fitness} />
            <Route exact path="/food" component={Food} />
            <Route exact path="/sleep" component={Sleep} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
