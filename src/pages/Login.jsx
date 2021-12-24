import { Button, Checkbox, Col, Form, Input, Modal, Row, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { ADMIN_LOGIN, VERIFICATION_CODE } from "../graphql/modules";
import { successNotify, warnNotify } from "../util";
import { loginUser } from "../store";
import { Link } from "react-router-dom";
// import { fstorage } from "../config";

const Login = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [handleLogin, { loading }] = useMutation(ADMIN_LOGIN);
  const onSubmit = async (value) => {
    const { email, password } = value;
    try {
      const {
        data: { AdminLogin },
      } = await handleLogin({
        variables: {
          email: email,
          password: atob(password),
        },
      });
      if (AdminLogin.success) {
        setVisible(true);
      } else {
        warnNotify(AdminLogin.message);
      }
    } catch (error) {}
  };


  // verify
  const [VerifyAccount, { loading: verifyLoading }] =
  useMutation(VERIFICATION_CODE);
const loginWithVerificationCode = async () => {
  try {
    const {
      data: { Verify2FCodeAdmin },
    } = await VerifyAccount({
      variables: {
        code,
      },
    });
    if (Verify2FCodeAdmin.success) {
      successNotify();
      dispatch(loginUser(Verify2FCodeAdmin));
      setVisible(false);
    }
  } catch (error) {
    console.log(error.message);
  }
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
      <Modal
        visible={visible}
        title="Two Factor Login"
        onOk={loginWithVerificationCode}
        onCancel={() => setVisible(false)}
        okButtonProps={{
          loading: verifyLoading,
          disabled: !code || verifyLoading,
        }}
        maskClosable={false}
      >
        <div>
          <label>We've sent the verification code to your email.</label>
        </div>
        <Input
          size="large"
          type="text"
          placeholder="Code"
          onChange={(e) => setCode(e.target.value)}
        />
      </Modal>
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
              Or <Link to="/reg">register now!</Link>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
    </Row>
  );
};

export default Login;
