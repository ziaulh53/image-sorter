import React, { useEffect } from "react";
import { WrapperDiv } from "../../Shared";
import { Button, Col, Modal, PageHeader, Popconfirm, Row, Spin } from "antd";
import {
  DeleteFilled,
  EyeFilled,
  FileExcelOutlined,
  MehOutlined,
  PlusOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { getImage, successNotify } from "../../../util";
import { useState } from "react";
import { AddImageModal, RatedImageModal } from ".";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  DELETE_IMAGE,
  FETCH_SINGLE_SESSION_ADMIN,
} from "../../../graphql/modules";
import { CSVLink } from "react-csv";

const SessionDetails = () => {
  const [visible, setVisible] = useState(false);
  const [scoreImageVisible, setScoreImageVisible] = useState("");
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const { id } = useParams();
  const search = useLocation().search;
  const session = new URLSearchParams(search).get("sessionId");
  const { data, loading, refetch } = useQuery(FETCH_SINGLE_SESSION_ADMIN, {
    variables: {
      id: session,
      userId: id,
    },
  });

  const sessionData = data?.FetchSingleSessionAdmin?.result || {};

  // seperate image by user score
  const scoreImages = [];
  const lowScoreImages = [];
  const dd = sessionData?.images?.map((img) => {
    if (img.score) {
      if (img?.score > 5) {
        scoreImages.push(img);
      } else if (img?.score < 5) {
        lowScoreImages.push(img);
      }
    }
  });

  // delete single image
  const [DeleteSingleImage] = useMutation(DELETE_IMAGE);
  const deleteImage = async (id) => {
    try {
      const {
        data: { DeleteImage },
      } = await DeleteSingleImage({
        variables: {
          id,
        },
      });
      if (DeleteImage.success) {
        successNotify(DeleteImage.message);
        refetch();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (sessionData?.images?.length > 0) {
      let collect = [];
      const dd = sessionData?.images?.map((item, idx) => {
        if (idx < 20) {
          collect.push({
            Image_Name: item?.link?.split("^")[1] || "",
            Score: item?.score || "Not yet",
          });
        }
      });
      console.log(dd);

      setCsvData(collect);
    }
  }, [sessionData?.images]);

  return (
    <WrapperDiv>
      <div className="d-flex justify-content-between align-items-center">
        <PageHeader title={`Bukcet: ${sessionData?.name || "Bucket"}`} />
        <div className="d-flex">
          <Button
            icon={
              <SmileOutlined
                style={{ marginBottom: "1px", marginRight: "12px" }}
              />
            }
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
            }}
            type="primary"
            disabled={sessionData?.images?.length === 0}
            onClick={() => setScoreImageVisible("good")}
          >
            Good Score
          </Button>
          <Button
            icon={
              <MehOutlined
                style={{ marginBottom: "1px", marginRight: "12px" }}
              />
            }
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
            }}
            type="primary"
            disabled={sessionData?.images?.length === 0}
            onClick={() => setScoreImageVisible("low")}
          >
            Low Score
          </Button>
          <Button
            icon={
              <FileExcelOutlined
                style={{ marginBottom: "1px", marginRight: "12px" }}
              />
            }
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
            }}
            type="primary"
            disabled={sessionData?.images?.length === 0}
          >
            <CSVLink style={{ color: "#fff" }} data={csvData}>
              Download CSV
            </CSVLink>
          </Button>
          <Button
            type="primary"
            onClick={() => setAddImageVisible(true)}
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
            Add Image
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Spin spinning={loading}>
          <Row gutter={[16, 16]}>
            {sessionData?.images?.map((item) => (
              <Col span={4} key={item._id}>
                <div
                  className="d-flex justify-content-between"
                  style={{
                    border: "1px solid #ddd5d5",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <h5>{item?.link?.split("^")[1]}</h5>
                  <div>
                    <EyeFilled
                      style={{ marginRight: "10px" }}
                      onClick={() => setVisible(item)}
                    />
                    <Popconfirm
                      title="Are you sure?"
                      okButtonProps={{ type: "danger" }}
                      onConfirm={() => deleteImage(item._id)}
                    >
                      <DeleteFilled />
                    </Popconfirm>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Spin>
      </div>

      <Modal
        title={`${visible?.link?.split("^")[1] || "Image view"}`}
        visible={visible._id}
        footer={null}
        onCancel={() => setVisible({})}
      >
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <div>
            Score: <b>{visible.score || "Not given yet"}</b>
          </div>
          {/* <div>
            <a
              target="_blank"
              href={`${getImage(visible?.link)}`}
              download
            >
              <DownloadOutlined />
            </a>
          </div> */}
        </div>
        <img src={getImage(visible.link)} className="w-100" />
      </Modal>
      <AddImageModal
        visible={addImageVisible}
        setVisible={setAddImageVisible}
        userId={id}
        sessionId={session}
        refetch={refetch}
      />
      <RatedImageModal
        data={scoreImageVisible === "good" ? scoreImages : lowScoreImages}
        scoreImageVisible={scoreImageVisible}
        setScoreImageVisible={setScoreImageVisible}
      />
    </WrapperDiv>
  );
};

export default SessionDetails;
