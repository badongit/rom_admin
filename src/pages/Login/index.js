import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { Navigate } from "react-router";

export default function Login() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(
      login({
        phoneNumber: values.username,
        password: values.password,
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (state.token) return <Navigate to="/dashboard" />;

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url('https://haidilaovietnam.com/wp-content/uploads/2022/05/165162732_142372397803749_6464844474417306224_n.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Card className="login-form">
        <div className="header">
          <div
            className="logo"
            style={{
              color: "#D70018",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 28,
            }}
          >
            Hadilao
          </div>
          <h1>ĐĂNG NHẬP HỆ THỐNG</h1>
          <p>Trang dành cho quản trị viên</p>
        </div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
