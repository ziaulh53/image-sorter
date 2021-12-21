import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { ADD_USER } from "../../../graphql/modules";
import { successNotify } from "../../../util";
import { useMutation } from "@apollo/react-hooks";

const AddUserModal = ({ refetch, setVisible, visible }) => {


    // close modal
  const closeModal = () => {
    setVisible(false);
  };

  const [AddNewUser, { loading: addLoading }] = useMutation(ADD_USER);
  const onFinish = async (value) => {
    delete value.confirmPassword;
    try {
      const {
        data: { AddUser },
      } = await AddNewUser({
        variables: {
          userInput: {
            ...value,
          },
        },
      });
      if (AddUser.success) {
        successNotify(AddUser.message);
        refetch();
        setVisible(false);
      }
    } catch (error) {}
  };
  return (
    <Modal
      title="Add Client"
      visible={visible}
      onCancel={closeModal}
      closable
      okText="Add"
      onOk={onFinish}
      footer={null}
    >
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          required
          tooltip="This is a required field"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required
          tooltip="This is a required field"
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          required
          name="confirmPassword"
          dependencies={["passord"]}
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item
          label="User Name"
          required
          name="userName"
          tooltip="This is a required field"
        >
          <Input placeholder="User Name" size="large" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input placeholder="Phone" size="large" />
        </Form.Item>
        <Form.Item className="text-end">
          <Button
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={addLoading}
            //   onClick={onFinish}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
