import { Redirect, Route, HashRouter, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Layout, Row, Form } from "antd";

import "antd/dist/antd.css";
import Login from "../components/login";
import Contact from "../components/contact";

export default function Content() {
  const { Content } = Layout;
  return <Content></Content>;
}

// export default function Content() {
//   const { Content } = Layout;
//   return (
//     <HashRouter>
//       <Switch>
//         <Route path="/" exact>
//           <IndexForm />
//           <Redirect to="Login" />
//         </Route>
//         <Route path="/Login" exact>
//           <Login />
//         </Route>

//         <Route path="/Otp" exact>
//           <Otp />
//         </Route>

//         <Route path="/contacts" exact>
//           <IndexForm />
//         </Route>

//         <Route path="*">
//           <NotFoundPage />
//         </Route>
//       </Switch>
//     </HashRouter>
//   );
// }
