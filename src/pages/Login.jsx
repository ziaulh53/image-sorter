import { Button, Checkbox, Col, Form, Input, Row, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { fstorage } from "../config";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (value) => {
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ padding: "0 50px", minHeight: "100vh" }}
    >
      <Col span={8}>
        <Spin spinning={loading}>
          <Form
            style={{
              border: "1px solid #cbcbcb",
              padding: "50px",
              borderRadius: "7px",
            }}
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              wrapperCol={{ span: 24 }}
              style={{ marginBottom: "30px" }}
              required
              tooltip="This is a required field"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              required
              tooltip="This is a required field"
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ textAlign: "center", width: "100%" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontWeight: "bold",
                }}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
    </Row>
  );
};

export default Login;
