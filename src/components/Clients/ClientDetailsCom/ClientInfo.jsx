import React from "react";
import { WrapperDiv } from "../../Shared";
import { Col, PageHeader, Row, Spin } from "antd";

const ClientInfo = ({ data, loading }) => {
  return (
    <WrapperDiv>
      <Spin spinning={loading}>
        <PageHeader title="Clients Information" />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>Email:</label>
            <div className="info-item d-flex">
              <p>{data?.email}</p>
            </div>
          </Col>
          <Col span={8}>
            <label>User Name:</label>
            <div className="info-item d-flex">
              <p>{data?.userName}</p>
            </div>
          </Col>
          <Col span={8}>
            <label>Phone number:</label>
            <div className="info-item d-flex">
              <p>{data?.phone}</p>
            </div>
          </Col>
        </Row>
      </Spin>
    </WrapperDiv>
  );
};

export default ClientInfo;
