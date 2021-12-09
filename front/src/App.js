import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.css";
//components and layouts
import Header from "./layout/header";
import Content from "./layout/content";
import Footer from "./layout/footer";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Footer /> */}
    {/* <Route path="/anket"> */}
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      {/* #0000FF  background:"#FFD700"   color: "white", fontSize: "1.5rem", font: "bold"*/}
      <Header />
      <Content />
      <Footer />
    </Layout>
    {/* </Route> */}
    </Router>

    
  );
}

export default App;
