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
import DwnImages from "./New";
import JSZip from "jszip";

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

  const onClickDownload = async () => {
    var zip = new JSZip();
    var img = zip.folder("images");
    console.log(scoreImages);
    await scoreImages.map(async (item) => {
      const response = await fetch(
        "https://greatgable.fra1.cdn.digitaloceanspaces.com/996-1640615182996^download-(1).jpeg",
        {}
      );
      response.blob().then((blob) => {
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
        // img.file(item.link?.split("^")[1], base64data);
        console.log({ url });
      });
    });
    // zip
    //   .generateAsync({ type: "base64", name: "All Good Images" })
    //   .then((content) => {
    //     window.location = "data:application/zip;base64," + content;
    //     // saveAs(content, "example.zip")
    //   });

    // const response = await fetch(pictures[i], {});
    //   response.blob().then((blob) => {
    //     console.log(blob);
    //     let url = window.URL.createObjectURL(blob);
    //     let a = document.createElement("a");
    //     a.href = url;
    //     a.download = "picture.jpeg";
    //     a.click();
    //   });
  };

  // seperate image by user score
  const scoreImages = [];
  const lowScoreImages = [];
  const dd = sessionData?.images?.map((img) => {
    if (img.postureSortScore) {
      if (img?.postureSortScore > 5) {
        scoreImages.push(img);
      } else if (img?.postureSortScore < 5) {
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
            Score: item?.postureSortScore || "Not yet",
          });
        }
      });
      setCsvData(collect);
    }
  }, [sessionData?.images]);

  return (
    <WrapperDiv>
      <DwnImages />
      <div className="d-flex justify-content-between align-items-center">
        <PageHeader title={`Bukcet: ${sessionData?.name || "Bucket"}`} />
        <div className="d-flex">
          <Button
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
            }}
            type="primary"
            onClick={onClickDownload}
          >
            Download
          </Button>
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
            Score: <b>{visible.postureSortScore || "Not given yet"}</b>
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
