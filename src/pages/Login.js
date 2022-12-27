import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import context from "../routes/context";

const Login = () => {
  const { user, setUser } = useContext(context);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = (values) => {
    if (user.loggedIn) return;
    setUser({ name: values.account, loggedIn: true, role: "test" });
    // localStorage.setItem("userIsLogin", "true");
    if (location.state?.from) {
      navigate(location.state.from);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ padding: "0.5rem 1rem" }}>
      <Form
        name="Login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
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
          label="Account"
          name="account"
          rules={[
            {
              required: true,
              message: "Please input your account!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
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

export default Login;
