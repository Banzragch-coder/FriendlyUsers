import React, { useState, useEffect } from "react";
import {Button, Form,  message, } from "antd";
import "../../src/App.css";
import axios from "axios";
import Contact from "./contact" ;
import Login from "./login" ;


export default function IndexForm() {
  // const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const layout = { labelCol: { span: 26 } , wrapperCol: { span: 26 }, };
 
  const onFinish = (values) => {
    console.log("Success123:", values);
    setCurrent(current + 1);

   axios.post(
        "http://10.10.40.141:3001/create", values )
        .then((response) =>
        {
          setCurrent(current + 1);
        console.log("res:", response);
        message.success("Амжилттай хадгалагдлаа");
        form.resetFields();
        })
        .catch(error => {
          onFinishFailed()
       });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.success("Алдаа гарлаа аль нэг мэдээлэл бөглөгдөөгүй байна");
  };
  useEffect(() => {  
  }, []); 
  return (
    <div
        style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }} 
    >
      <div
        className="cardStyle"
        style={{ display: "flex", flexDirection: "column", width: "60%", margin:"5rem" }}
      >
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              size="large"
              justify="center"
            >
             <Contact/>
              <br/>
              <br/>
             {/* <Login/> */}
            </Form> 
            <Button> Илгээх </Button>
      </div>
    </div>
  );
}
