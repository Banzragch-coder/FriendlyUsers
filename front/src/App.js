import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Login from "../src/components/login";
import Contact from "../src/components/contact";
import Success from "../src/components/success";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";
import { Spin } from "antd";
import "devextreme/dist/css/dx.light.css";
function App() {
  const [isLoader, setIsLoader] = useState(false);
  const loaderCss = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-59%, -50%)",
  };
  return (
    <>
      {isLoader ? (
        <Spin tip="Уншиж байна." style={loaderCss} />
      ) : (
        <HashRouter>
          <Switch>
            <Route path="/" exact>
              <Login isLoader={isLoader} setIsLoader={setIsLoader} />
              <Redirect to="Login" />
            </Route>
            <Route path="/Login" exact>
              <Login isLoader={isLoader} setIsLoader={setIsLoader} />
            </Route>
            <Route path="/contact" exact>
              <Contact />
            </Route>
            <Route path="/success" exact>
              <Success />
            </Route>
          </Switch>
        </HashRouter>
      )}
    </>
  );
}
export default App;

// if (sessionStorage === "") {
//  <div>
//    {" "}
//    <Route path="/contact" exact>
//      <Contact />
//    </Route>
//    <Route path="/success" exact>
//      <Success />
//    </Route>
//  </div>;
// };
// else {
//   <div>
//  <Route path="/" exact>
//               <Login isLoader={isLoader} setIsLoader={setIsLoader} />
//               <Redirect to="Login" />
//             </Route>
//             <Route path="/Login" exact>
//               <Login isLoader={isLoader} setIsLoader={setIsLoader} />
//             </Route>
// </div>
// }
