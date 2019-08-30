import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Home from "./pages/Home";
import Path from "./pages/Path";

function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/path/:id" component={Path} />
        </Switch>
      </Router>
    </AppContainer>
  );
}

export default App;
