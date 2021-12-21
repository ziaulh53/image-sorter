import { DeleteFilled } from "@ant-design/icons/lib/icons";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Col, PageHeader, Popconfirm, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DELETE_IMAGE,
  FETCH_IMAGES,
  FETCH_SINGLE_USER,
} from "../../graphql/modules";
import { getImage, successNotify } from "../../util";
import { WrapperDiv } from "../Shared";
import { AddImageModal, ClientInfo } from "./ClientDetailsCom";

const ClientDetails = () => {
  const [visible, setVisible] = useState(false);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();

  //   fetch user details
  const { data, loading } = useQuery(FETCH_SINGLE_USER, {
    variables: {
      id,
    },
  });
  const userDetails = data?.FetchUserById?.user || {};

  useEffect(() => {
    if (id) {
      GetUserId({ variables: { limit, offset, userId:id } });
    }
  }, [id]);

  //   fetch images
  const [GetUserId, { data: allImages, loading: imageLoading, refetch }] =
    useLazyQuery(FETCH_IMAGES);
  const userImages = allImages?.FetchImagesAdmin?.result || [];

  //delete image api
  const [DeleteSingleImage, { loading: deleteLoading }] =
    useMutation(DELETE_IMAGE);
  const deleteImage = async (imageId) => {
    try {
      const {
        data: { DeleteImage },
      } = await DeleteSingleImage({
        variables: {
          id: imageId,
        },
      });
      if (DeleteImage.success) {
        successNotify(DeleteImage.message);
        refetch();
      }
    } catch (error) {}
  };

  return (
    <div className="clients-section">
      <div className="mb-3">
        <ClientInfo data={userDetails} loading={loading} />
      </div>
      <div>
        <WrapperDiv>
          <div className="d-flex justify-content-between align-items-center">
            <PageHeader title="Image bucket" />
            <Button type="primary" onClick={() => setVisible(true)}>
              Add Image
            </Button>
          </div>
          <AddImageModal
            visible={visible}
            setVisible={setVisible}
            userId={id}
            refetch={refetch}
          />
          <div className="mb-3">
            <Spin spinning={imageLoading || deleteLoading}>
              <Row gutter={[16, 16]}>
                {userImages.map((item) => (
                  <Col key={item._id} span={4}>
                    <img
                      src={getImage(item.link)}
                      style={{
                        width: "100%",
                        position: "relative",
                      }}
                      alt=""
                    />
                    <Popconfirm
                      title="Are you sure?"
                      okButtonProps={{
                        type: "danger",
                      }}
                      okText="Delete"
                      onConfirm={() => deleteImage(item._id)}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "16px",
                          color: "red",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-around",
                          width: "31px",
                          height: "32px",
                          alignItems: "center",
                          backgroundColor: "#28212187",
                          borderRadius: "50%",
                        }}
                      >
                        <DeleteFilled />
                      </div>
                    </Popconfirm>
                  </Col>
                ))}
              </Row>
            </Spin>
          </div>
        </WrapperDiv>
      </div>
    </div>
  );
};

export default ClientDetails;
