import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Login from "../src/components/login";
import Contact from "../src/components/contact";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Login />
          <Redirect to="Login" />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
      </Switch>
    </HashRouter>
  );
}
export default App;
