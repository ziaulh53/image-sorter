import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
// import { fstorage } from "../config";

const LoginPage = () => {
  //   const [allImages, setAllImages] = useState([]);

  //   const upload = async (e) => {
  //     const image = e.target.files[0];
  //     fstorage.ref(`/images/${image.name}`).put(image);
  //   };

  //   const fetchImage = async () => {
  //     let result = await fstorage.ref("images").listAll();
  //     let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

  //     return Promise.all(urlPromises);
  //   };
  //   useEffect(async () => {
  //     const url = await fetchImage();
  //     setAllImages(url);
  //   }, []);

  const onSubmit = () => {};
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
        <Form
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
            label="Username"
            name="username"
            wrapperCol={{ span: 24 }}
            required
            tooltip="This is a required field"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            required
            tooltip="This is a required field"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your password!" }]}
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
              style={{ textAlign: "center", width: "100%", fontWeight: "bold" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
