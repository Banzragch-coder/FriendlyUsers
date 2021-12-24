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
} from "antd";
import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";

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
    console.log("contact js onFinish dataSource===>", dataSourse);
    var a = sessionStorage.getItem("Token");
    axios
      .put("http://friendlyusers.uni/api/contacts/phone", dataSourse, {
        headers: {
          Authorization: "Bearer " + a,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          message.success("Амжилттай илгээгдлээ.");
          history.push("/success");
          sessionStorage.clear();
        } else {
          console.log("catch error");
          message.error("Алдаа гарлаа.");
        }
      })
      .catch((e) => {
        console.log("catch error");
        message.error("Алдаа гарлаа.");
      });
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
    console.log(record);
    setIsEditing(true);
    setEditingContact({ ...record });
    // const editContact = {};
    // setDataSourse((pre) => {
    //   return [...pre, editContact];
    // });
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
    setIsEditingAdd(false);
  };
  const onFinishAdd = (values) => {
    setIsEditingAdd(true);
    console.log("sub form values========:");
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
    console.log("values", values);
    console.log("data source===", dataSourse);
    setDataSourse((pre) => {
      let old = pre.find((item) => {
        return item.id === editingContact.id;
      });
      const oldIndex = pre.indexOf(old);
      console.log(oldIndex);
      pre[oldIndex] = values;
      return [...pre];
    });

    resetEditing();
  };
  // const onFinishEdit = (values) => {
  //   values = { ...editingContact, ...values };
  //   setIsEditing(true);
  //   console.log("values", values);
  //   console.log("data source===", dataSourse);
  //   setDataSourse((pre) => {
  //     let old = pre.find((item) => {
  //       return item.id === editingContact.id;
  //     });
  //     const oldIndex = pre.indexOf(editingContact.id);
  //     console.log(oldIndex);
  //     pre[oldIndex] = values;
  //     return [...pre];
  //   });
  //   resetEditing();
  // };
  const [dataSourse, setDataSourse] = useState([
    // {
    //   phone: "89116456",
    //   family_phone: "90909090",
    //   family_who: "dada",
    // },
    // {
    //   phone: "89116456",
    //   family_phone: "90909090",
    //   family_who: "dada",
    // },
  ]);
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
  return (
    <>
      <Form
        name="normal"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Header
          style={{ background: "#3d3c3a", color: "white", fontSize: "1.8rem" }}
        >
          <div>Unitel.mn</div>
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
                    <div>
                      <Button onClick={onAddContact}>дугаар нэмэх </Button>
                      <br />
                      <br />
                    </div>
                    <Table
                      className="ant-table-thead"
                      size="large"
                      columns={columns}
                      dataSource={dataSourse}
                      pagination={false}
                    ></Table>
                    <br />

                    <Modal
                      footer={null}
                      title="Дугаар засах"
                      visible={isEditing}
                      onCancel={() => {
                        setIsEditing(false);
                      }}
                      // onOk={() => {
                      //   setDataSourse((pre) => {
                      //     return pre.map((contact) => {
                      //       if (contact.id === editingContact.id) {
                      //         return editingContact;
                      //       } else {
                      //         return contact;
                      //       }
                      //     });
                      //   });
                      //   resetEditing();
                      // }}
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
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Талбарын утга хоосон байна.!",
                          //   },
                          // ]}
                        >
                          <Select
                            placeholder="Сонгоно уу"
                            // placeholder="hii"
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
                      {/* <Input
                        value={editingContact?.family_who}
                        onChange={(e) => {
                          setEditingContact((pre) => {
                            return { ...pre, family_who: e.target.value };
                          });
                        }}
                        label={"Таны хэн болох"}
                        style={{ marginRight: "10px" }}
                        name="family_who"
                        rules={[
                          {
                            required: true,
                            message: "Талбарын утга хоосон байна.!",
                          },
                        ]}
                      /> */}
                      {/* <Input
                        value={editingContact?.family_phone}
                        placeholder="Утасны дугаар"
                        onChange={(e) => {
                          setEditingContact((pre) => {
                            return { ...pre, family_phone: e.target.value };
                          });
                        }}
                      /> */}
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
              { required: true, message: "Талбарын утга хоосон байна.!" },
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
                pattern: /^[8]\d{7}$/,
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
