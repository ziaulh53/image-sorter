import {
  DeleteFilled,
  DownloadOutlined,
  FileExcelOutlined,
  PlusOutlined,
} from "@ant-design/icons/lib/icons";
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
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import axios from "axios";
import fetchImages from "fetch-images";

const ClientDetails = () => {
  const [visible, setVisible] = useState(false);
  // const [userScore, setUserScore] = useState([]);
  // const [sortedImage, setSortedImage] = useState([]);
  // const [limit] = useState(20);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();
  const { jwtToken } = useSelector((state) => state?.auth);
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
    } else {
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

  const onDownloadUserReview = async () => {
    var zip = new JSZip();
    var img = zip.folder("images");

    scoreImages.map(async (table) => {
      let img = new Image();
      const images = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Edvard_Munch_-_The_dance_of_life_%281899-1900%29.jpg/1920px-Edvard_Munch_-_The_dance_of_life_%281899-1900%29.jpg",
        img,
      ];

      // fetchImages(images)
      //   .then((values) => {
      //     values.map((value) => console.log(value));
      //   }).catch(data=>console.log(data))
      //   .catch((err) => console.log(err));
      // writing table name on img
      // const canvas = document.getElementById(table?._id);
      // let myImage = new Image();
      // myImage.src = getImage(table.link);
      // axios.get(getImage(table.link)).then(res=>console.log(res))

      fetch("https://i.ytimg.com/vi/QbnOrr4xU50/maxresdefault.jpg", {
        mode: "no-cors",
      })
        .then(function (res) {
          return res.blob();
        })
        .then(function (res) {
          console.log(res.size, res.type);
          const localUrl = URL.createObjectURL(res);
          console.log(localUrl);
        });

      // console.log(myImage);
      // return
      // const context = canvas.getContext("2d");
      // context.font = "3px Arial";
      // context.fillText(table?.name, 23, 56);
      // context.save();

      // const pngUrl = canvas
      //   .toDataURL("image/png")
      //   .replace("image/png", "image/octet-stream");

      // const fileObj = dataURItoBlob(blobData);
      // img.file(table.link + ".png", new Blob([blobData], {type:"image/png"}));
    });

    zip
      .generateAsync({ type: "base64", name: "All qrCode" })
      .then((content) => {
        window.location = "data:application/zip;base64," + content;
        // saveAs(content, "example.zip")
      });
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
                  <DownloadOutlined
                    style={{ marginBottom: "1px", marginRight: "12px" }}
                  />
                }
                style={{
                  marginRight: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
                type="primary"
                onClick={onDownloadUserReview}
              >
                Download images
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
            <Spin spinning={imageLoading || deleteLoading}>
              <Row gutter={[16, 16]} id="my-node">
                {userImages.map((item, idx) => (
                  <Col key={idx} span={4}>
                    <img
                      src={getImage(item.link)}
                      // src="https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg"
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

const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  // var byteString = atob(dataURI.split(',')[1]);
  var byteString = URL.createObjectURL(
    new Blob([dataURI.split(",")[1]], { type: "text/plain" })
  );

  // // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // // create a view into the buffer
  var ia = new Uint8Array(ab);

  // // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });

  return blob;
};
