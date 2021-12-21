import {
  DeleteFilled,
  InboxOutlined,
} from "@ant-design/icons/lib/icons";
import { Col, message, PageHeader, Row, Upload } from "antd";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { WrapperDiv } from "../components/Shared";

const { Dragger } = Upload;

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: k,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  display: "flex",
  padding: grid,
  // overflow: "auto",
});

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const ClientDetails = () => {
  const [state] = useState(getItems(15));

  return (
    <div className="clients-section">
      <div className="mb-3">
        <WrapperDiv>
          <PageHeader title="Clients Information" />
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <label>Email:</label>
              <div className="info-item d-flex">
                <p>dfdfd@gg.com</p>
              </div>
            </Col>
            <Col span={8}>
              <label>User Name:</label>
              <div className="info-item d-flex">
                <p>dfdfd@gg.com</p>
              </div>
            </Col>
            <Col span={8}>
              <label>Phone number:</label>
              <div className="info-item d-flex">
                <p>dfdfd@gg.com</p>
              </div>
            </Col>
          </Row>
        </WrapperDiv>
      </div>
      <div>
        <WrapperDiv>
          <PageHeader title="Image bucket" />
          <div className="mb-3">
            <DragDropContext>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    <Row gutter={[16, 16]}>
                      {state.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={`${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Col
                              span={4}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // style={getItemStyle(
                              //   snapshot.isDragging,
                              //   provided.draggableProps.style
                              // )}
                            >
                              <img
                                src="/img/sample-logo.png"
                                style={{
                                  width: "100%",
                                  position: "relative",
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
                              >
                                <DeleteFilled />
                              </div>
                            </Col>
                          )}
                        </Draggable>
                      ))}
                    </Row>

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* <Col span={4}>
                <img
                  src="/img/sample-logo.png"
                  style={{ width: "100%", position: "relative" }}
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
                >
                  <DeleteFilled />
                </div>
              </Col>
              <Col span={4}>
                <img
                  src="/img/sample-logo.png"
                  style={{ width: "100%", position: "relative" }}
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
                >
                  <DeleteFilled />
                </div>
              </Col>
              <Col span={4}>
                <img
                  src="/img/sample-logo.png"
                  style={{ width: "100%", position: "relative" }}
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
                >
                  <DeleteFilled />
                </div>
              </Col> */}
            {/* </Row> */}
          </div>
          <div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
            ,
          </div>
        </WrapperDiv>
      </div>
    </div>
  );
};

export default ClientDetails;
