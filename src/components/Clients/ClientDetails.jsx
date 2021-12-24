import {
  FileExcelOutlined,
  PlusOutlined,
  SmileOutlined,
  MehOutlined
} from "@ant-design/icons/lib/icons";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Button, PageHeader, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FETCH_IMAGES, FETCH_SINGLE_USER } from "../../graphql/modules";
import { WrapperDiv } from "../Shared";
import { AddImageModal, ClientInfo, RatedImageModal, SingleImage } from "./ClientDetailsCom";
import { CSVLink } from "react-csv";

const ClientDetails = () => {
  const [visible, setVisible] = useState(false);
  // const [userScore, setUserScore] = useState([]);
  // const [sortedImage, setSortedImage] = useState([]);
  // const [limit] = useState(20);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();
  const [csvData, setCsvData] = useState([]);

  //   fetch user details
  const { data, loading } = useQuery(FETCH_SINGLE_USER, {
    variables: {
      id,
    },
  });
  const userDetails = data?.FetchUserById?.user || {};

  useEffect(() => {
    if (id) {
      GetUserId({ variables: { limit, offset, userId: id } });
    }
  }, [id]);

  //   fetch images
  const [GetUserId, { data: allImages, loading: imageLoading, refetch }] =
    useLazyQuery(FETCH_IMAGES);
  const userImages = allImages?.FetchImagesAdmin?.result || [];

  // seperate image by user score
  const scoreImages = [];
  const lowScoreImages = [];
  const dd = userImages?.map((img) => {
    if (img?.score > 5) {
      scoreImages.push(img);
    } else if(img?.score < 5) {
      lowScoreImages.push(img);
    }
  });

  useEffect(() => {
    if (userImages.length > 0) {
      let collect = [];
      userImages.map((item) =>
        collect.push({
          Image_Name: item?.link || "",
          Score: item?.score || "Not yet",
        })
      );

      setCsvData(collect);
    }
  }, [userImages]);

  const [scoreVisible, setScoreVisible] = useState(false);

  const onDownloadUserReview = (rate = "good") => {
    setScoreVisible(rate);
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
                disabled={userImages?.length===0}
                onClick={()=>onDownloadUserReview('good')}
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
                disabled={userImages?.length===0}
                onClick={()=>onDownloadUserReview('low')}
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
                disabled={userImages?.length===0}
              >
                <CSVLink style={{ color: "#fff" }} data={csvData}>
                  Download CSV
                </CSVLink>
              </Button>
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
                Add Image
              </Button>
            </div>
          </div>
          <AddImageModal
            visible={visible}
            setVisible={setVisible}
            userId={id}
            refetch={refetch}
          />
          <div className="mb-3">
            <Spin spinning={imageLoading}>
              <Row gutter={[16, 16]} id="my-node">
                {userImages.map((item) => (
                  <SingleImage item={item} refetch={refetch} key={item._id} />
                ))}
              </Row>
            </Spin>
          </div>
          <RatedImageModal
            data={scoreVisible === "good" ? scoreImages : lowScoreImages}
            scoreImageVisible={scoreVisible}
            setScoreImageVisible={setScoreVisible}
          />
        </WrapperDiv>
      </div>
    </div>
  );
};

export default ClientDetails;
