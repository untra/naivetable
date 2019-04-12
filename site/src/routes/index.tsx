import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import home from "./home";
import test from "./test";

// NOTE: see https://medium.com/@Dragonza/react-router-problem-with-gh-pages-c93a5e243819
// for explanation of BrowserRouter hook-up

export default () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={home} />
      <Route path="/test" component={test} />
      <Route
        component={() => (
          <div className="wrapper">
            <h1>{"404 Not found"}</h1>{" "}
          </div>
        )}
      />
    </Switch>
  </BrowserRouter>
);
