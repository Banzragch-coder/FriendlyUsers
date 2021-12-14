import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Button, Form, message } from "antd";
import "../../src/App.css";
import Contact from "./contact";
import Login from "./login";

export default function IndexForm() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const layout = { labelCol: { span: 26 }, wrapperCol: { span: 26 } };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <br />
      <div
        className="cardStyle"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          margin: "1rem",
        }}
      >
        <Form>
          <Contact />
          {/* <Login /> */}
          <br />
        </Form>
        <Button type="primary" htmlType="submit">
          {" "}
          ИЛГЭЭХ{" "}
        </Button>
      </div>
    </div>
  );
}
