import {
  CopyOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons/lib/icons";
import { Button, Form, Input, message, Modal, PageHeader, Table } from "antd";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const Clients = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const [state, setState] = useState({});

  const closeModal = () => {
    setState({});
    setVisible(false);
  };
  const onFinish = (value) => {
    console.log(value);
  };

  const handlePasswordCopy = () => {
    setCopy(true);
    message.success("Copied");
  };

  //data
  const dataSource = [
    {
      key: 1,
      userName: "mike",
      phone: "+8814655435566",
      password: "568746",
      email: "test@gg.com",
    },
    { key: 2, userName: "jimmy", phone: "+8814655435566", password: "568746" },
    { key: 3, userName: "jack", phone: "+8814655435566", password: "568746" },
    { key: 4, userName: "micky", phone: "+8814655435566", password: "568746" },
  ];
  // column
  const columns = [
    {
      title: <b>Email</b>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <b>User Name</b>,
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: <b>Password</b>,
      dataIndex: "password",
      width: "200px",
      render: (text) => {
        return (
          <div className="d-flex align-items-center">
            <Input.Password
              style={{ caretColor: "transparent", border: "none" }}
              placeholder="input password"
              value={text}
              iconRender={(visible) => {
                return (
                  <div>
                    {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                  </div>
                );
              }}
            />
            <CopyToClipboard text={text} onCopy={handlePasswordCopy}>
              <CopyOutlined />
            </CopyToClipboard>
          </div>
        );
      },
    },
    {
      title: <b>Phone</b>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: <b>Action</b>,
      dataIndex: "phone",
      render: (_, record)=><Link to={`/clients/4`}>View Details</Link>
    },
  ];

  return (
    <div className="clients-section">
      <div className="mb-3">
        <PageHeader
          className="site-page-header"
          // onBack={() => null}
          title="Clients"
        />
      </div>
      <div className="text-end mb-2">
        <Button type="primary" onClick={() => setVisible(true)}>
          Add Client
        </Button>
      </div>
      <div className="">
        <Table columns={columns} dataSource={dataSource} />
      </div>

      <Modal
        title="Add Client"
        visible={visible}
        onCancel={closeModal}
        closable
        okButtonProps={{
          loading: loading,
        }}
        okText="Add"
        onOk={onFinish}
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
          <Form.Item label="Email" required tooltip="This is a required field">
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            required
            tooltip="This is a required field"
          >
            <Input placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            required
            tooltip="This is a required field"
          >
            <Input placeholder="Phone" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;
