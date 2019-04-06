import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import home from "./home";
import test from "./test";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={home} />
      <Route exact path="/test" component={test} />
    </Switch>
  </BrowserRouter>
);