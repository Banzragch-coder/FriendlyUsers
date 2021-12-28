import "antd/dist/antd.css";
import "../App.css";
import "../../src/App.css";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Layout,
  Select,
  message,
  Card,
} from "antd";
import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Contact(props) {
  const history = useHistory();
  const { Footer, Header } = Layout;
  const { Option } = Select;
  const [formModal] = Form.useForm();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAdd, setIsEditingAdd] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const onFinish = (values) => {
    var a = sessionStorage.getItem("Token");
    message.success("Системээс гарлаа.");
    history.push("/Login");
    sessionStorage.clear();
  };

  useEffect(() => {
    getRelatedContacts();
    var token = sessionStorage.getItem("Token");
    if (token === null) {
      history.replace("/success");
    }
  }, []);

  const getRelatedContacts = () => {
    var a = sessionStorage.getItem("Token");
    var config = {
      method: "get",
      url: "http://friendlyusers.uni/api/contacts/phone",
      headers: {
        Authorization: "Bearer " + a,
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => setDataSourse(res.data))
      .catch((err) => {});
  };

  const onEditContact = (record) => {
    setIsEditing(true);
    setEditingContact({ ...record });
  };

  const onDeleteContact = (record) => {
    Modal.confirm({
      title: "Устгах уу",
      okText: "Тийм",
      cancelText: "Үгүй",
      onOk: () => {
        setDataSourse((pre) => {
          var a = sessionStorage.getItem("Token");
          var config = {
            method: "DELETE",
            url: "http://friendlyusers.uni/api/contacts/phone/" + record.id,
            headers: {
              Authorization: "Bearer " + a,
              "Content-Type": "application/json",
            },
          };
          axios(config).then((response) => {
            message.success("Амжилттай устлаа");
            getRelatedContacts();
            formModal.resetFields();
          });
          return pre.filter((contact) => contact.id !== record.id);
        });
      },
    });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingContact(null);
  };

  const onAddContact = () => {
    setIsEditingAdd(true);
    const newContact = {};
  };

  const handleCancelAdd = () => {
    setIsEditingAdd(false);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  const onFinishAdd = (values) => {
    setIsEditingAdd(true);
    if (values.family_who === undefined) {
      values.family_who = "";
    }
    var a = sessionStorage.getItem("Token");
    var config = {
      method: "POST",
      url: "http://friendlyusers.uni/api/contacts/phone",
      headers: {
        Authorization: "Bearer " + a,
        "Content-Type": "application/json",
      },
      data: values,
    };
    axios(config).then((res) => {
      getRelatedContacts();
      message.success("Амжилттай нэмэгдлээ");
      setIsEditingAdd(false);
      formModal.resetFields();
    });
  };

  const onFinishEdit = (values) => {
    values = { ...editingContact, ...values };
    setIsEditing(true);
    setDataSourse((pre) => {
      let old = pre.find((item) => {
        return item.id === editingContact.id;
      });
      const oldIndex = pre.indexOf(old);
      console.log(oldIndex);
      pre[oldIndex] = values;
      var a = sessionStorage.getItem("Token");
      var config = {
        method: "PUT",
        url: "http://friendlyusers.uni/api/contacts/phone/" + values.id,
        headers: {
          Authorization: "Bearer " + a,
          "Content-Type": "application/json",
        },
        data: values,
      };
      axios(config).then((response) => {
        message.success("Амжилттай шинэчлэгдлээ");
      });
      return [...pre];
    });

    resetEditing();
  };

  const [dataSourse, setDataSourse] = useState([]);

  const columns = [
    {
      key: "family_phone",
      title: "Утасны дугаар",
      dataIndex: "family_phone",
    },
    {
      key: "family_who",
      title: "Таны хэн болох",
      dataIndex: "family_who",
    },
    {
      key: "status",
      title: "Төлөв",
      render: (record) => {
        return (
          <>
            <Button
              icon={
                <EditOutlined
                  onClick={() => {
                    onEditContact(record);
                  }}
                />
              }
              style={{ color: "#1890FF", marginLeft: 10 }}
            />
            <Button
              icon={
                <DeleteOutlined
                  onClick={() => {
                    onDeleteContact(record);
                  }}
                />
              }
              style={{ color: "red", marginLeft: 10 }}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Form
        name="normal"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Header
          style={{ boxShadow: "1px 1px 1px 1px #f5f5f5" }}
          className="ant-page-header"
        >
          <div>
            <img src="../logo.svg" width={"50%"} />
          </div>
          <div>
            <Button type="primary" htmlType="submit">
              {" "}
              ГАРАХ{" "}
            </Button>
          </div>
        </Header>
        <Layout className="layout" style={{ minHeight: "100vh" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <br />
            <Card
              title="Contacts"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
                margin: "1rem",
              }}
            >
              <Form>
                <div className="App">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginBottom: "16px",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={onAddContact}
                      icon={<PlusOutlined />}
                    >
                      {"Дугаар нэмэх"}
                    </Button>
                  </div>
                  <Table
                    className="ant-table-thead"
                    size="large"
                    columns={columns}
                    dataSource={dataSourse}
                    pagination={false}
                  ></Table>
                  <Modal
                    footer={null}
                    title="Дугаар засах"
                    visible={isEditing}
                    onCancel={() => {
                      setIsEditing(false);
                    }}
                  >
                    <Form onFinish={onFinishEdit}>
                      <Form.Item
                        onChange={(e) => {
                          setEditingContact((pre) => {
                            console.log("=========", e.target.value);
                            return { ...pre, family_who: e.target.value };
                          });
                        }}
                        value={editingContact?.family_who}
                        label={"Таны хэн болох"}
                        style={{ marginRight: "10px" }}
                        name="family_who"
                      >
                        <Select
                          placeholder="Сонгоно уу"
                          value={editingContact?.family_who}
                        >
                          <Option value="Нөхөр">Нөхөр</Option>
                          <Option value="Эхнэр">Эхнэр</Option>
                          <Option value="Аав">Аав</Option>
                          <Option value="Ээж">Ээж</Option>
                          <Option value="Эмээ">Эмээ</Option>
                          <Option value="Өвөө">Өвөө</Option>
                          <Option value="Ах">Ах</Option>
                          <Option value="Эгч">Эгч</Option>
                          <Option value="Хүү">Хүү</Option>
                          <Option value="Охин">Охин</Option>
                          <Option value="Дүү эрэгтэй">Дүү эрэгтэй</Option>
                          <Option value="Дүү эмэгтэй">Дүү эмэгтэй</Option>
                          <Option value="Хүргэн">Хүргэн</Option>
                          <Option value="Бэр">Бэр</Option>
                          <Option value="Бусад">Бусад</Option>
                        </Select>
                      </Form.Item>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button onClick={handleCancelEdit}>Болих</Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ marginLeft: "15px" }}
                        >
                          Нэмэх
                        </Button>
                      </div>
                    </Form>
                  </Modal>
                </div>
                <br />
              </Form>
            </Card>
          </div>
        </Layout>
        <Footer className="footer">
          <div>{"Copyright ©2021 "}</div>
          <div>{"Unitel.mn"}</div>
        </Footer>
      </Form>
      <Modal
        title="Дугаар нэмэх"
        visible={isEditingAdd}
        onCancel={handleCancelAdd}
        footer={null}
      >
        <Form name="contacts" onFinish={onFinishAdd}>
          <Form.Item
            label={"Таны хэн болох"}
            style={{ marginRight: "10px" }}
            name="family_who"
            rules={[
              { required: false, message: "Талбарын утга хоосон байна.!" },
            ]}
          >
            <Select placeholder="Сонгоно уу">
              <Option value="Нөхөр">Нөхөр</Option>
              <Option value="Эхнэр">Эхнэр</Option>
              <Option value="Аав">Аав</Option>
              <Option value="Ээж">Ээж</Option>
              <Option value="Эмээ">Эмээ</Option>
              <Option value="Өвөө">Өвөө</Option>
              <Option value="Ах">Ах</Option>
              <Option value="Эгч">Эгч</Option>
              <Option value="Хүү">Хүү</Option>
              <Option value="Охин">Охин</Option>
              <Option value="Дүү эрэгтэй">Дүү эрэгтэй</Option>
              <Option value="Дүү эмэгтэй">Дүү эмэгтэй</Option>
              <Option value="Хүргэн">Хүргэн</Option>
              <Option value="Бэр">Бэр</Option>
              <Option value="Бусад">Бусад</Option>
            </Select>
          </Form.Item>

          <Form.Item
            placeholder="Утасны дугаар"
            label={"Утасны дугаар"}
            style={{ marginRight: "10px" }}
            name="family_phone"
            rules={[
              {
                required: true,
                message: "Заавал бөглөнө үү",
              },

              {
                pattern: /^(86|88|80|89)\d{6}$/,
                message: "Зөвхөн юнителийн дугаар оруулах",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancelAdd}>Болих</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "15px" }}
            >
              Нэмэх
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
