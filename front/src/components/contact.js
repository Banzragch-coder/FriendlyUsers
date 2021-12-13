import "antd/dist/antd.css";
import "../App.css";
import "../../src/App.css";
import { Button, Table, Modal, Form, Input, Layout, Content } from "antd";
import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Contact() {
  const { Footer, Content } = Layout;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const layout = { labelCol: { span: 26 }, wrapperCol: { span: 26 } };
  useEffect(() => {
    axios.get("http://localhost:8080/api/contacts/89110001").then((res) => {
      console.log(res);
      setDataSourse(res.data);
    });
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [dataSourse, setDataSourse] = useState([]);
  const columns = [
    {
      key: "3",
      title: "Таны хэн болох",
      dataIndex: "family_who",
    },
    {
      key: "4",
      title: "Утасны дугаар",
      dataIndex: "family_phone",
    },
    {
      key: "5",
      title: "Төлөв",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditContact(record);
              }}
              style={{ color: "#1890FF", marginLeft: 10 }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteContact(record);
              }}
              style={{ color: "red", marginLeft: 10 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteContact = (record) => {
    Modal.confirm({
      title: "Устгах уу",
      okText: "Тийм",
      cancelText: "Үгүй",
      onOk: () => {
        setDataSourse((pre) => {
          return pre.filter((contact) => contact.id !== record.id);
        });
      },
    });
  };

  const onEditContact = (record) => {
    setIsEditing(true);
    setEditingContact({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingContact(null);
  };

  const onAddContact = () => {
    // const randomNumber = Math.round(Math.random() * (useState.dataSource.length - 1));
    const randomNumber = parseInt(Math.random() * 1000);
    const newContact = {
      id: randomNumber,
      phone: "89110001" + randomNumber,
      family_who: "mom" + randomNumber,
      family_phone: "89110014" + randomNumber,
    };

    setDataSourse((pre) => {
      return [...pre, newContact];
    });
  };

  return (
    <Form>
      <header
        style={{
          background: "#3d3c3a",
          color: "white",
          fontSize: "1.8rem",
        }}
      >
        <div>Unitel.mn</div>
      </header>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
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
              <div className="App">
                <header style={{ justifyContent: "flex-end" }}>
                  <Table
                    className="ant-table-thead"
                    size="large"
                    columns={columns}
                    dataSource={dataSourse}
                    pagination={false}
                  ></Table>
                  <br />
                  <Button onClick={onAddContact}>дугаар нэмэх </Button>
                  <Modal
                    title="Дугаар засах"
                    visible={isEditing}
                    onCancel={() => {
                      setIsEditing(false);
                    }}
                    onOk={() => {
                      setDataSourse((pre) => {
                        return pre.map((contact) => {
                          if (contact.id === editingContact.id) {
                            return editingContact;
                          } else {
                            return contact;
                          }
                        });
                      });
                      resetEditing();
                    }}
                  >
                    <Input
                      value={editingContact?.family_who}
                      placeholder="Таны хэн болох"
                      onChange={(e) => {
                        setEditingContact((pre) => {
                          return { ...pre, family_who: e.target.value };
                        });
                      }}
                    />
                    <Input
                      value={editingContact?.family_phone}
                      placeholder="Утасны дугаар"
                      onChange={(e) => {
                        setEditingContact((pre) => {
                          return { ...pre, family_phone: e.target.value };
                        });
                      }}
                    />
                  </Modal>
                </header>
              </div>
              <br />
            </Form>
            <Button type="primary" htmlType="submit">
              {" "}
              ИЛГЭЭХ{" "}
            </Button>
          </div>
        </div>
      </Layout>
      <footer
        style={{
          justifyContent: "",
          position: "sticky",
          textAlign: "center",
          background: "#3d3c3a",
          color: "white",
        }}
      >
        {"©2021 "}
        <div></div>
      </footer>
    </Form>
  );
}
