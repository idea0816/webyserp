import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import context from "../routes/context";

const MyLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, API_URL } = useContext(context);

  // button click
  const onFinish = (values) => {
    // POST請求
    axios
      .post(API_URL + "/login", {
        userid: values.userID,
        username: "",
        pwd: values.passWord,
        email: "",
        lastdatetime: "",
        yn: "",
        passwordchen: "",
        fromip: "",
        depid: "",
        engname: "",
        report: "",
        supervisorid: "",
      })
      .then((response) => {
        // console.log(response.data);
        message.success("Loinged !!!");
        if (user.loggedIn) return;
        setUser({
          name: response.data.userName,
          id: response.data.userID,
          loggedIn: true,
          role: response.data.depid, // 這裡埋我自己的判斷、以depid去決定role
          token: response.data.token,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", response.data.userID);
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        message.error(
          "Can't Login !!!(HTTP Status Code : " + error.response.status + ")",
          10
        );
        console.log(error);
      })
      .finally(() => {
        // console.log(values);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ padding: "1rem" }}>
      <Form
        name="Login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label=""
          name="userID"
          rules={[
            {
              required: true,
              message: "Please input your account!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label=""
          name="passWord"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            {user.loggedIn ? "Logout" : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyLogin;
