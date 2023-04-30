import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, CodeOutlined } from "@ant-design/icons";

const menu = () => {
  let menuItems = [
    {
      label: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <Link to="/admin">
          <CodeOutlined />
        </Link>
      ),
      key: "admin",
    },
    {
      label: "品檢作業",
      key: "llkczy",
      children: [
        { label: <Link to="/qcInput">QCInput</Link>, key: "qcInput" },
        {
          label: <Link to="/qcReport">QCReport</Link>,
          key: "qcReport",
        },
      ],
    },
  ];

  let menuClick = (e) => {};
  return (
    <div>
      <Menu
        items={menuItems}
        onClick={menuClick}
        mode="horizontal"
        theme="dark"
      />
    </div>
  );
};

export default menu;
