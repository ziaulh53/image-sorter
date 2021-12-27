import {
  CopyOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  DeleteFilled,
  EyeOutlined,
} from "@ant-design/icons/lib/icons";
import { useQuery } from "@apollo/react-hooks";
import { Button, Input, message, PageHeader, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { FETCH_ALL_USER } from "../../graphql/modules";
import { AddUserModel } from "./ClientListCom";

const Clients = () => {
  const [visible, setVisible] = useState(false);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);

  // fetch all users
  const { data, loading, refetch } = useQuery(FETCH_ALL_USER, {
    variables: {
      limit,
      offset,
    },
  });

  const allUser = data?.FetchUserList?.users || [];

  // add user api

  const handlePasswordCopy = () => {
    message.success("Copied");
  };

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
        console.log(Buffer.from(text).toString("base64"));
        return (
          <div className="d-flex align-items-center">
            <Input.Password
              style={{ caretColor: "transparent", border: "none" }}
              placeholder="input password"
              value={btoa(text)}
              iconRender={(visible) => {
                return (
                  <div>
                    {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                  </div>
                );
              }}
            />
            <CopyToClipboard text={btoa(text)} onCopy={handlePasswordCopy}>
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
      render: (_, record) => (
        <div>
          <Link
            style={{ marginRight: "10px" }}
            to={`/clients/details/${record?._id}`}
          >
            <EyeOutlined />
          </Link>
          <Popconfirm
            title="Are you sure?"
            okButtonProps={{
              type: "danger",
            }}
          >
            <DeleteFilled style={{ color: "red" }} />
          </Popconfirm>
        </div>
      ),
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
      <AddUserModel
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
      />
      <div className="text-end mb-2">
        <Button type="primary" onClick={() => setVisible(true)}>
          Add Client
        </Button>
      </div>
      <div className="">
        <Table
          columns={columns}
          dataSource={allUser}
          loading={loading}
          rowKey={(rowKey) => rowKey._id}
        />
      </div>
    </div>
  );
};

export default Clients;
