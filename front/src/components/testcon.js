import React, { useState, useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import {
  Layout,
  PageHeader,
  Card,
  Form,
  Button,
  Select,
  message,
  Table,
  Col,
  Row,
  InputNumber,
} from "antd";
import "../App.css";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import "antd/dist/antd.css";


function ContactInfo() {
  const { Content } = Layout;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
          {
            title: "Хамтран амьдрагчийн  утасны дугаар",
            dataIndex: "Хамтран амьдрагчийн  утасны дугаар",
            key: "Хамтран амьдрагчийн  утасны дугаар",
          },
         {
           title: "Таны юу болох",
           dataIndex: "Таны юу болох",
           key: "Таны юу болох",
         },
         {
           title: "утасны дугаар",
           dataIndex: "утасны дугаар" ,
           key: "утасны дугаар",
         },
         {
           key: "action",
           render: (text, record) => (
             <Button
               shape="circle"
               icon={
                 <DeleteFilled
                   style={{ color: "red" }}
                   onClick={() => deleteFamilyFormData(record.id)}
                 />
               }
             />
           ),
         },
  ];

  useEffect(() => {
    getAllFormData();
    getFamilyFormData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getAllFormData = () => {
    axios
      .get("https://sain-form-default-rtdb.firebaseio.com/Users/UserInformation.json")
      .then((response) => {
        console.log("getAll:", response);
      });
  };

  const getFamilyFormData = () => {
    axios
      .get(
        "https://sain-form-default-rtdb.firebaseio.com/Users/UserInformation/UserFamily.json"
      )
      .then((response) => {
        console.log("data", response.data);
        if (response.data === null) {
          message.warning("Гэр бүлийн мэдээлэл хоосон байна.");
        } else {
          var newArray = [];
          for (var i = 0; i < Object.keys(response.data).length; i++) {
            var obj = {
              ...Object.assign(
                {},
                response.data[Object.keys(response.data)[i]]
              ),
            };
            obj.id = Object.keys(response.data)[i];
            newArray.push(obj);
          }
          setDataSource(newArray);
          console.log("dataSource:", dataSource);
        }
      });
  };

  const deleteFamilyFormData = (id) => {
    console.log("id", id);
    axios
      .delete("https://sain-form-default-rtdb.firebaseio.com/Users/UserInformation/UserFamily/" + id + ".json")
      .then((response) => {
        getFamilyFormData();
        message.warning("Ажилттай устгагдлаа");
      });
  };

  const onFinishModal = (values) => {
    console.log("sub form values:", values);
    axios
      .post(
        "https://sain-form-default-rtdb.firebaseio.com/Users/UserInformation/UserFamily.json",
        values
      )
      .then((response) => {
        getFamilyFormData();
        message.success("Амжилттай нэмэгдлээ");
        setIsModalVisible(false);
        formModal.resetFields();
      });
  };

  const onFinish = (values) => {
    console.log("main form values:", values);
    axios
      .post(
        "https://sain-form-default-rtdb.firebaseio.com/Users/UserInformation.json",
        values
      )
      .then((response) => {
        console.log("res:", response);
        message.success("Амжилттай хадгалагдлаа");
        form.resetFields();
      });
  };


  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px", background: "white" }}>
        {/* <PageHeader
          className="site-page-header"
          title="ОЙР ДОТНЫ ХҮМҮҮСИЙН МЭДЭЭЛЭЛ"
          subTitle="Мэдээллээ үнэн зөв бөглөнө үү"
        /> */}
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Row justify="space-between" style={{ marginBottom: "15px", justifyContent: "center"}}>
            <Col span={16}>
              <Card
                title="Мэдээлэл үнэн эсэх"
                bordered={false}
                style={{ border: "4px solid #f8f8f8", height: "750px" }}
              >     
                 <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 15,
                  }}
                >
                  <Button type="primary" onClick={showModal} >
                    Нэмэх
                  </Button>
                </div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  size="small"
                  style={{ border: "2px solid #d2d2d2" }}
                />
              <br/>
              <br/>
                
         <Form.Item  
              // style={{
              // padding: "27px",
              // border: "1px solid #f8f8f8", 
              // }}
               >
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#53b019", border: "1px solid white", }}
              size={"large"}
              block
            >
              Илгээх
            </Button>
        </Form.Item>

              </Card>
            </Col>
          </Row>
          
         
        </Form>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            form={formModal}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinishModal}
          >
            <Form.Item
              label={"Phone"}
              style={{ marginRight: "10px" }}
              name="Хамтран амьдрагчийн  утасны дугаар"
              rules={[
                { required: true, message: "Талбарын утга хоосон байна.!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={"phone2"}
              style={{ marginRight: "10px" }}
              name="Хамтран амьдрагчийн  утасны дугаар"
              rules={[
                { required: true, message: "Талбарын утга хоосон байна.!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={"Таны юу болох"}
              style={{ marginRight: "10px" }}
              name="Таны юу болох"
              rules={[
                { required: true, message: "Талбарын утга хоосон байна.!" },
              ]}
            >
              <Select
                placeholder="Сонгоно уу"
              >
                <Option value="Нөхөр">Нөхөр</Option>
                <Option value="Эхнэр">Эхнэр</Option>
                <Option value="Аав">Аав</Option>
                <Option value="Ээж">Ээж</Option>
                <Option value="Ах">Ах</Option>
                <Option value="Эгч">Эгч</Option>
                
              </Select>
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel}>Болих</Button>
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
      </Content>
    </Layout>
  );
}

export default ContactInfo;