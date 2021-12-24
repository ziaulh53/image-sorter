import React from "react";
import { Col, Popconfirm } from 'antd'
import { DeleteFilled } from "@ant-design/icons";
import { DELETE_IMAGE } from "../../../graphql/modules";
import { useMutation } from "@apollo/react-hooks";
import { getImage, successNotify } from "../../../util";

const SingleImage = ({refetch, item}) => {


    const [DeleteSingleImage, { loading: deleteLoading }] =
    useMutation(DELETE_IMAGE);
  const deleteImage = async () => {
    try {
      const {
        data: { DeleteImage },
      } = await DeleteSingleImage({
        variables: {
          id: item._id,
        },
      });
      if (DeleteImage.success) {
        successNotify(DeleteImage.message);
        refetch();
      }
    } catch (error) {}
  };

  return (
    <Col span={4}>
      <img
        src={getImage(item.link)}
        id={item._id}
        style={{
          width: "100%",
          position: "relative",
          height: "160px",
        }}
        alt=""
      />
      <Popconfirm
        title="Are you sure?"
        okButtonProps={{
          type: "danger",
        }}
        okText="Delete"
        onConfirm={deleteImage}
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
  );
};

export default SingleImage;
