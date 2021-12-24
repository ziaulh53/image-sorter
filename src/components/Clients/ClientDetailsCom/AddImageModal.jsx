import React, { useState } from "react";
import { Col, Modal, Row, Spin } from "antd";
import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_IMAGES, SINGLE_FILE_UPLAOD } from "../../../graphql/modules";
import { getImage, successNotify } from "../../../util";

const AddImageModal = ({ visible, setVisible, userId, refetch }) => {
  // state for uplaoding images
  const [images, setImages] = useState([]);

  const closeModal = () => {
    setVisible(false);
  };

  // file uplaoding in store
  const [SingleFileUplaod, { loading:singleLoading }] = useMutation(SINGLE_FILE_UPLAOD);
  const fileUplaod = async (e) => {
    const { files = [] } = e.target;
    console.log(files.length);

    const file = [...images];
    for (var i = 0; i < files.length; i++) {
      try {
        const {
          data: { SingleUpload },
        } = await SingleFileUplaod({
          variables: {
            file: files[i],
          },
        });
        if (SingleUpload.success) {
          file.push({
            link: SingleUpload.imageLink,
            user: userId
          });
          setImages([...file]);
        }
      } catch (error) {}
    }
  };

  // submit
  const [AddUploadImages, { loading:imageLoading }] = useMutation(ADD_IMAGES);
  const onFinish = async () => {
    try {
      const {
        data: { AddImages },
      } = await AddUploadImages({
        variables: {
          list: [...images],
        },
      });
      if (AddImages.success) {
        refetch()
        successNotify(AddImages.message);
        setVisible(false);
        setImages([]);
        // refetch()
      }
    } catch (error) {}
  };

  // delete from state
  const deleteImage = (id) => {
    const ab = [...images].filter((item) => item !== id);
    setImages(ab);
  };

  return (
    <Modal
      title="Add Images"
      visible={visible}
      width="50%"
      onCancel={closeModal}
      okButtonProps={{
        disabled: images.length === 0 || imageLoading,
        loading: imageLoading,
      }}
      okText="Add"
      onOk={onFinish}
    >
      <Spin spinning={singleLoading}>
        <div className="mb-3">
          <label
            className="ant-upload ant-upload-drag ant-upload-drag-uploading d-flex justify-content-around align-items-center"
            htmlFor="file-upload"
            style={{ height: "200px" }}
          >
            {/* <label htmlFor="file-upload">dfdfdf</label> */}

            <div>
              <UploadOutlined />
              <p className="text-center">Upload files</p>
            </div>

            <input
              id="file-upload"
              multiple
              type="file"
              style={{
                display: "none",
              }}
              onChange={fileUplaod}
            />
          </label>
        </div>
      </Spin>

      <Row gutter={[16, 16]}>
        {images.map((item) => (
          <Col key={item?.link} span={4}>
            <img
              src={getImage(item?.link)}
              style={{
                width: "100%",
                position: "relative",
                height:"100px"
              }}
              alt=""
            />
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "16px",
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => deleteImage(item)}
            >
              <DeleteFilled />
            </div>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default AddImageModal;
