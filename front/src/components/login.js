import React, { useState, useEffect } from "react";
import "../App.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Layout, FromItem } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const { Header, Footer } = Layout;
  const onFinish = (values) => {
    const pass = values.pass;
    const mail = values.mail;
    console.log("pass ====> " + pass);
    console.log("mail ======> " + mail);
  };

  return (
    <Layout
      className="layout"
      style={{ minHeight: "100vh" }}
      // name="normal_login"
      // className="login-form"
      // initialValues={{ remember: true }}
      // onFinish={onFinish}
    >
      <Header
        style={{ background: "#3d3c3a", color: "white", fontSize: "1.8rem" }}
      >
        <div>Unitel.mn</div>
      </Header>
      <Form
        style={{
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "12rem",
        }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.2rem",
            background: "#C0C0C0",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>Сайн байна уу? та байгууллагын хаягаар нэвтэрч орно уу </div>
            <br />
            <br />
            <br />

            <Form.Item
              name="mail"
              rules={[{ required: true, message: "Имэйлээ оруулна уу! " }]}
            >
              <Input
                onChange={(e) => setUserName(e.target.value)}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Имэйл хаяг"
              />
            </Form.Item>
            <Form.Item
              name="pass"
              rules={[{ required: true, message: "Нууц үгээ оруулна уу! " }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Нууц үг"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Сануулах</Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot"
                style={{ fontSize: "12px" }}
                href="https://erp.unitel.mn/login/password_reset"
              >
                Нууц үгээ мартсан？
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Нэвтрэх
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
      <Footer
        style={{
          position: "sticky",
          textAlign: "center",
          background: "#3d3c3a",
          color: "white",
        }}
      >
        {" "}
        {"©2021 "}
      </Footer>
    </Layout>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
