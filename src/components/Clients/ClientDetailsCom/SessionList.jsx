import React, { useEffect } from "react";
import { WrapperDiv } from "../../Shared";
import { Button, Col, Input, Modal, PageHeader, Popconfirm, Row } from "antd";
import { DeleteFilled, FolderFilled, PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD_SESSION, DELETE_SESSION, FETCH_SESSION_ADMIN } from "../../../graphql/modules";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";
import { successNotify } from "../../../util";

const SessionList = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [limit] = useState(20);
  const [offset] = useState(0);
  const [visible, setVisible] = useState(0);
  const [bucketName, setBucketName] = useState("");

  useEffect(() => {
    if (id) {
      GetFetchSession({ variables: { limit, offset, userId: id } });
      // console.log(id)
    }
  }, [id]);

  // fetch session
  const [GetFetchSession, { data, loading, refetch }] =
    useLazyQuery(FETCH_SESSION_ADMIN);
  const userSesion = data?.FetchSessionListAdmin?.result || [];

  // create bucket
  const [CreateNewBucket, { loading: bucketCreateLoading }] =
    useMutation(ADD_SESSION);
  const createBucket = async () => {
    try {
      const {
        data: { AddSession },
      } = await CreateNewBucket({
        variables: {
          name: bucketName,
          user: id,
        },
      });
      if (AddSession.success) {
        successNotify(AddSession.message);
        setBucketName("");
        setVisible(false);
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete bucket 
  const [DeleteBucket] = useMutation(DELETE_SESSION);
  const deleteSingleBucket = async (id)=>{
    try {
      const {data: {DeleteSession}} = await DeleteBucket({
        variables:{
          id
        }
      })
      if(DeleteSession.success){
        successNotify(DeleteSession.message)
        refetch()
      } else {
        successNotify(DeleteSession.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <WrapperDiv>
      <div className="d-flex justify-content-between align-items-center">
        <PageHeader title="All Bucket" />
        <div className="d-flex">
          <Button
            type="primary"
            onClick={() => setVisible(true)}
            icon={
              <PlusOutlined
                style={{ marginBottom: "1px", marginRight: "12px" }}
              />
            }
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Create Bucket
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Row gutter={[16, 16]}>
          {userSesion?.map((item) => (
            <Col span={3} key={item._id}>
              <div className="d-flex justify-content-around">
                <Link
                  style={{ color: "#5F6060" }}
                  to={`${pathname}/session?sessionId=${item._id}`}
                >
                  <FolderFilled
                    style={{ fontSize: "65px", cursor: "pointer" }}
                  />
                </Link>
                <Popconfirm title="Are you sure?" onConfirm={()=>deleteSingleBucket(item._id)}>
                  <DeleteFilled style={{ color: "red" }} />
                </Popconfirm>
              </div>
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "5px",
                  color: "#000",
                }}
              >
                {moment(Number(item.createdAt)).format("YYYY-MM-DD_HH-mm-ss")}
              </p>
            </Col>
          ))}
        </Row>
        <Modal
          title="New bucket create"
          visible={visible}
          onCancel={() => {
            setBucketName("");
            setVisible(false);
          }}
          okText="Create"
          onOk={createBucket}
          okButtonProps={{
            loading: bucketCreateLoading,
            disabled: bucketCreateLoading,
          }}
        >
          <label className="mb-2">Enter Bucket Name <small>(optional)</small></label>
          <Input
            onChange={(e) => setBucketName(e.target.value)}
            placeholder="Bucket name"
            size="large"
            value={bucketName}
          />
        </Modal>
      </div>
    </WrapperDiv>
  );
};

export default SessionList;
