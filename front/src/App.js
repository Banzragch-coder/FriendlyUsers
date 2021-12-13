import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.css";
import Login from "../src/components/login";
import Contact from "../src/components/contact";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";

// function App() {
//   return (
//     <Layout className="layout" style={{ minHeight: "100vh" }}>
//       {/* <Login /> */}
//       <Contact />
//     </Layout>
//   );
// }

// export default App;

// // history.replace("/otp");
function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

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
        {/* <Route path="/Otp" exact>
          <Otp />
        </Route> */}
        <Route path="/contact" exact>
          <Contact />
        </Route>
        {/* <Route path="*">
          <NotFoundPage />
        </Route> */}
      </Switch>
    </HashRouter>
  );
}
export default App;
