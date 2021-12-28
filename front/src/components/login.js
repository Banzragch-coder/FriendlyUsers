import React, { useState, useEffect } from "react";
import "../App.css";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  message,
  Divider,
  Row,
  Col,
  Card,
  Modal,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default function Login(props) {
  const [dataSourse, setDataSourse] = useState([]);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const history = useHistory();

  const { Header, Footer } = Layout;
  const [isModalVisible, setIsModalVisible] = useState(true);

  const onFinish = (values) => {
    props.setIsLoader(true);
    axios
      .post("http://friendlyusers.uni/api/contacts/login", {
        name: values.mail,
        pass: values.pass,
      })
      .then((res) => {
        props.setIsLoader(false);
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
  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          Тавтай морилно уу
        </span>
      </Divider>
    </div>
  );

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Layout
      className="layout"
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        // backgroundColor: "#f0f0f0",
      }}
    >
      <div
        className="h-100"
        className="container d-flex flex-column justify-content-center h-100"
      >
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card style={{ boxShadow: "2px 4px 2px 4px #f5f5f5" }}>
              <div className="my-4">
                <div className="text-center">
                  <div>
                    <img src="../logo.svg" width={"50%"} />
                  </div>
                  <p
                    style={{
                      marginTop: "16px",
                      fontWeight: "bold",
                      color: "#1a3353",
                    }}
                  >
                    FRIENDLY USERS
                  </p>
                  <p className="text-center">Домайн хаягаар нэвтэрч орно уу!</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <>
                      <Form
                        onFinish={onFinish}
                        layout="vertical"
                        name="login-form"
                      >
                        <Form.Item
                          name="mail"
                          label="Домайн хаяг"
                          rules={[
                            {
                              required: true,
                              message: "Та и-мэйл хаягаа оруулна уу",
                            },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined className="text-primary" />}
                          />
                        </Form.Item>
                        <Form.Item
                          name="pass"
                          label={
                            <div>
                              <span>Нууц үг</span>
                              <a
                                href="https://erp.unitel.mn/login/password_reset"
                                style={{ margin: "1rem" }}
                                className="cursor-pointer font-size-sm font-weight-normal text-muted"
                              >
                                Нууц үг мартсан
                              </a>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Та нууц үгээ оруулна уу",
                            },
                          ]}
                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-primary" />}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" block>
                            Нэвтрэх
                          </Button>
                        </Form.Item>
                        {renderOtherSignIn}
                      </Form>
                    </>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title="FriendlyUsers"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <p>
          {
            "Шинэ бүхэнд түрүүлж алхдаг Юнител групп-н ажилтан таны болон гэр бүлийн гишүүдийн тань дугаарыг шинэ биллинг систем рүү түрүүлж нэвтрүүлэхээр болсонг дуулгахад таатай байна. Та гэр бүлийнхээ гишүүдийн дугаарыг сайтар нягталж оруулна уу. "
          }
        </p>
      </Modal>
    </Layout>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
