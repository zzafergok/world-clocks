import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Cities from "./components/Cities";
import Clock from "./components/Clock";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Cities} />
          <Route path="/:continent/:area" exact component={Clock} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
