import React, { useState, useEffect } from "react";
import {Layout, Form} from "antd";
import axios from "axios";
import IndexForm from "../components/indexForm";

export default function Content() {
  const { Content } = Layout;
  return (
    <Content style={{ background: "#FAFAFB", fontSize: "1rem", margin:"0px" }}>
      <IndexForm />
    </Content>
  );
}