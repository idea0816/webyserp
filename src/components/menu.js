/**
 * @author CXY
 * @version Create Time:2023年7月31日
 * @Description Menu 改寫版
 *
 */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Avatar, Typography } from "antd";
import { HomeOutlined, CodeOutlined, UserOutlined } from "@ant-design/icons";
import context from "../routes/context";

const MyMenu = () => {
  const { user, setUser } = useContext(context);
  // Left Menu
  let menuItems = [
    // ERP
    {
      label: "ERP",
      key: "erp",
      children: [
        {
          label: (
            <Link to="/erp_autodistribution">Assembly Auto Distribution</Link>
          ),
          key: "autodistribution",
        },
      ],
    },
    // MES
    {
      label: "MES",
      key: "mes",
      children: [
        {
          label: "Integrated Data",
          key: "IntegratedData",
          children: [
            {
              label: "3F",
              key: "3F",
              children: [
                {
                  label: <Link to="/DT_G-LINE1">DT_G-LINE 1</Link>,
                  key: "DT_G-LINE1",
                },
                {
                  label: <Link to="/DT_G-LINE2">DT_G-LINE 2</Link>,
                  key: "DT_G-LINE2",
                },
                {
                  label: <Link to="/DT_G-LINE3">DT_G-LINE 3</Link>,
                  key: "DT_G-LINE3",
                },
                {
                  label: <Link to="/DT_G-LINE5">DT_G-LINE 5</Link>,
                  key: "DT_G-LINE5",
                },
                {
                  label: <Link to="/DT_G-LINE6">DT_G-LINE 6</Link>,
                  key: "DT_G-LINE6",
                },
                {
                  label: <Link to="/DT_G-LINE7">DT_G-LINE 7</Link>,
                  key: "DT_G-LINE7",
                },
                {
                  label: <Link to="/DT_G-LINE8">DT_G-LINE 8</Link>,
                  key: "DT_G-LINE8",
                },
              ],
            },
            {
              label: "4F",
              key: "4F",
            },
          ],
        },
        {
          label: "Various Production Lines",
          key: "VariousProductionLines",
          children: [
            {
              label: "3F",
              key: "v3F",
              children: [
                {
                  label: <Link to="/vDT_G-LINE1">DT_G-LINE 1</Link>,
                  key: "vDT_G-LINE1",
                },
                {
                  label: <Link to="/vDT_G-LINE2">DT_G-LINE 2</Link>,
                  key: "vDT_G-LINE2",
                },
                {
                  label: <Link to="/vDT_G-LINE3">DT_G-LINE 3</Link>,
                  key: "vDT_G-LINE3",
                },
                {
                  label: <Link to="/vDT_G-LINE5">DT_G-LINE 5</Link>,
                  key: "vDT_G-LINE5",
                },
                {
                  label: <Link to="/vDT_G-LINE6">DT_G-LINE 6</Link>,
                  key: "vDT_G-LINE6",
                },
                {
                  label: <Link to="/vDT_G-LINE7">DT_G-LINE 7</Link>,
                  key: "vDT_G-LINE7",
                },
                {
                  label: <Link to="/vDT_G-LINE8">DT_G-LINE 8</Link>,
                  key: "vDT_G-LINE8",
                },
              ],
            },
            {
              label: "4F",
              key: "v4F",
            },
          ],
        },
        // { label: <Link to="/mesFront">MesFront</Link>, key: "mesFront" },
        // {
        //   label: <Link to="/mesLine">MesLine</Link>,
        //   key: "mesLine",
        // },
      ],
    },
    // QC
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
  // 登出時清空session
  const handleLogout = () => {
    setUser({
      name: "",
      id: "",
      loggedIn: false,
      role: "",
      token: "",
    });
  };
  // Avatar旁的文字設定
  const { Text } = Typography;
  // Avatar
  const avatarLabel = !user.loggedIn ? (
    <Avatar style={{ backgroundColor: "#E68D87" }} icon={<UserOutlined />} />
  ) : (
    <div>
      <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
      <Text style={{ marginLeft: "12px", fontSize: "16px", color: "white" }}>
        {user.name}
      </Text>
    </div>
  );
  // 切換Login狀態
  const menuLabel = !user.loggedIn ? (
    <Link to="/login">Login</Link>
  ) : (
    <Link to="/" onClick={handleLogout}>
      Logout
    </Link>
  );
  // Right Menu-Login Menu
  let loginMenuItems = [
    {
      label: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
      key: "home",
    },
    {
      label: avatarLabel,
      key: "avatar",
      children: [
        {
          label: menuLabel,
          key: "login",
        },
        {
          label: <CodeOutlined />,
          key: "adminItems",
          children: [
            {
              label: (
                <Link to="/admin">
                  <CodeOutlined />
                </Link>
              ),
              key: "admin",
            },
            { type: "divider" },
            {
              label: <Link to="/qcInspectionRoom">Inspection Room</Link>,
              key: "qcInspectionRoom",
            },
            {
              label: <Link to="/mesYWCP">Warehouse</Link>,
              key: "mesWarehouse",
            },
            // {
            //   label: <Link to="/testTable">TestTable</Link>,
            //   key: "testTable",
            // },
          ],
        },
      ],
    },
  ];

  let menuClick = (e) => {};
  let loginMenuClick = (e) => {};
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu
        items={menuItems}
        onClick={menuClick}
        mode="horizontal"
        theme="dark"
        style={{ width: "50%" }}
      />
      {/* Login Menu */}
      <Menu
        items={loginMenuItems}
        onClick={loginMenuClick}
        mode="horizontal"
        theme="dark"
        style={{ width: "50%", justifyContent: "flex-end" }}
      />
    </div>
  );
};

export default MyMenu;
