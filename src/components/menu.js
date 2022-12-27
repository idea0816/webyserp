import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const menu = () => {
  let menuItems = [
    // { label: "Menu1", key: "item1" },
    // {
    //   label: <Link to="/login">Login</Link>,
    //   key: "login",
    // },
    {
      label: "品檢作業",
      key: "llkczy",
      children: [{ label: <Link to="/qcInput">QCInput</Link>, key: "qcInput" }],
    },
    // {
    //   label: <Link to="/admin">Admin</Link>,
    //   key: "admin",
    // },
    // {
    //   label: <Link to="/login">Login</Link>,
    //   key: "login",
    // },
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
