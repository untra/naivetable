import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import home from "./home";
import test from "./test";

// NOTE: see https://medium.com/@Dragonza/react-router-problem-with-gh-pages-c93a5e243819
// for explanation of BrowserRouter hook-up

export default () => (
  <BrowserRouter basename={'https://naivetable.untra.io'}>
  <Switch>
    <Route exact path="/" component={home} />
    <Route exact path="/test" component={test} />
    <Route component={() => (<div>404 Not found </div>)} />
  </Switch>
</BrowserRouter>);