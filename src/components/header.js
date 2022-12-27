import React from "react";

import { Layout } from "antd";
import Menu from "./menu";

const { Header } = Layout;

const header = () => {
  return (
    <Header>
      <Menu />
    </Header>
  );
};

export default header;
