import React from 'react';
import Stories from './components/Stories';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Comments from './components/Comments'
export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Stories} />
          <Route path="/comments/:id" component={Comments} />
        </Switch>
      </Router>

    </div>
  );
}