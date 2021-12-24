import React, { useState, useEffect } from "react";
import "../App.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Layout, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [dataSourse, setDataSourse] = useState([]);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const history = useHistory();

  // useEffect(() => {
  //   axios.get("http://localhost:7000/api/login/").then((res) => {
  //     console.log(res);
  //     setDataSourse(res.data);
  //   });
  // }, []);

  const { Header, Footer } = Layout;

  const onFinish = (values) => {
    const pass = values.pass;
    const mail = values.mail;
    props.setIsLoader(true);
    axios
      .post("http://friendlyusers.uni/api/contacts/login", {
        name: values.mail,
        pass: values.pass,
      })
      .then((res) => {
        props.setIsLoader(false);
        console.log("pass, name ===>", res);
        console.log(res.status);
        if (res && res.data && res.status === 200) {
          message.success("Амжилттай нэвтэрлээ.");
          sessionStorage.setItem("Token", res.data);
          history.push("/contact");
        } else {
          console.log("else error");
          message.error("Нэвтрэх нэр, эсвэл нууц үг буруу байна.");
          history.push("/login");
        }
      })
      .catch((e) => {
        props.setIsLoader(false);
        console.log("catch error");
        message.error("Нэвтрэх үед алдаа гарлаа.");
      });
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
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
          padding: "14rem",
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
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>Домайн хаяг эсвэл имэйл хаягаар нэвтэрч орно уу! </div>
            <br />
            <br />
            <br />

            <Form.Item
              name="mail"
              rules={[
                {
                  required: true,
                  message: "Имэйл эсвэл домайн нэр оруулна уу! ",
                },
              ]}
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
