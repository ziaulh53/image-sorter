import React from "react";
import { Card, Col, Modal, Row } from "antd";
import { getImage } from "../../../util";


const { Meta } = Card;

const RatedImageModal = ({ data, scoreImageVisible, setScoreImageVisible }) => {
  return (
    <Modal
      className="rate-modal"
      title={
        scoreImageVisible === "good"
          ? "This all images minimum point is 5"
          : "This all images maximum point is 4"
      }
      visible={scoreImageVisible}
      width="100%"
      style={{ minHeight: "100vh", maxWidth: "100%", top: "0" }}
      onCancel={() => setScoreImageVisible("")}
      okText="Add"
      footer={false}
    >
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col key={item?._id} span={4}>
            <Card
              style={{ width: '100%' }}
              hoverable
              shad
              cover={
                <img
                  alt="example"
                  src={getImage(item.link)}
                />
              }
            >
              <Meta
                title={item?.link?.split('^')[1]}
                description={`Score is: ${item?.score || 'Not given'}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default RatedImageModal;
