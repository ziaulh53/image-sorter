import React, { useEffect, useState } from "react";
import { WrapperDiv } from "../../Shared";
import { Button, Col, Input, PageHeader, Popconfirm, Row, Spin } from "antd";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  DELETE_USER,
  FETCH_SINGLE_USER,
  UPDATE_USER,
} from "../../../graphql/modules";
import { useHistory, useParams } from "react-router-dom";
import { successNotify, warnNotify } from "../../../util";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const ClientInfo = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  //   fetch user details
  const { data, loading, refetch } = useQuery(FETCH_SINGLE_USER, {
    variables: {
      id,
    },
    fetchPolicy: "cache-and-network",
  });
  const userDetails = data?.FetchUserById?.user || {};

  // set data to userdata state
  useEffect(() => {
    if (userDetails?._id) {
      closeEdit();
    }
  }, [userDetails]);

  // update user info
  const [UpdateUserMutation, { loading: updateLoading }] =
    useMutation(UPDATE_USER);
  const handleUserUpdate = async () => {
    try {
      const {
        data: { UpdateUser },
      } = await UpdateUserMutation({
        variables: {
          userId: id,
          userInput: userData,
        },
      });
      if (UpdateUser.success) {
        successNotify(UpdateUser.message);
        refetch();
        setEditMode(false)
      } else {
        warnNotify(UpdateUser.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete user
  const [DeleteUserMutaion, { loading: deleteLoading }] =
    useMutation(DELETE_USER);
  const handleDeleteUser = async () => {
    try {
      const {
        data: { DeleteUser },
      } = await DeleteUserMutaion({
        variables: {
          userId: id,
        },
      });
      if (DeleteUser.success) {
        successNotify(DeleteUser.message);
        history.push("/clients");
      } else {
        warnNotify(DeleteUser.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // control edit toggle
  const closeEdit = () => {
    setUserData({
      email: userDetails?.email,
      phone: userDetails?.phone,
      userName: userDetails?.userName,
    });
    setEditMode(false);
  };

  // handle input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const disable = !userData?.email || !userData?.phone || !userData?.userName;

  return (
    <WrapperDiv>
      <Spin spinning={false}>
        <div className="d-flex justify-content-between align-items-center">
          <PageHeader
            title="Clients Information"
            extra={[
              editMode ? (
                <CloseOutlined
                  onClick={closeEdit}
                  style={{ fontSize: "18px" }}
                />
              ) : (
                <EditOutlined
                  onClick={() => setEditMode(!editMode)}
                  style={{ fontSize: "18px" }}
                />
              ),
            ]}
          />
          <Popconfirm
            title="Are you sure?"
            okButtonProps={{
              type: "danger",
            }}
            onConfirm={handleDeleteUser}
          >
            <Button type="danger" loading={deleteLoading}>
              Delete User
            </Button>
          </Popconfirm>
        </div>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label className="mb-2">Email:</label>
            <Input
              size="large"
              name="email"
              onChange={handleInput}
              value={userData?.email}
              disabled={!editMode}
            />
          </Col>
          <Col span={8}>
            <label className="mb-2">User Name:</label>
            <Input
              size="large"
              name="userName"
              onChange={handleInput}
              value={userData?.userName}
              disabled={!editMode}
            />
          </Col>
          <Col span={8}>
            <label className="mb-2">Phone Number:</label>
            <Input
              size="large"
              name="phone"
              onChange={handleInput}
              disabled={!editMode}
              value={userData?.phone}
            />
          </Col>
        </Row>
        {editMode && (
          <Row align="end">
            <Col span={3}>
              <div className="text-end mt-2">
                <Button
                  disabled={disable}
                  loading={updateLoading}
                  size="large"
                  type="primary"
                  onClick={handleUserUpdate}
                >
                  Update
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Spin>
    </WrapperDiv>
  );
};

export default ClientInfo;
