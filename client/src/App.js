import React from "react";
import Main from "./pages/main"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () =>
<Router>
  <div>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
</Router>;

export default App;
