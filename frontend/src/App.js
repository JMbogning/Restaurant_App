import React from 'react';
import Navigation from './router/Navigation';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './screens/auth/Login';



const App = () => {
  return (
      <Router>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Navigation} />
          </Switch>
      </Router>
  );
};

export default App;
