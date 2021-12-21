import { Row } from "antd";
import React from "react";

export const CustomHeader = () => {
  return (
    <div>
      <h3>Clients</h3>
    </div>
  );
};

export const WrapperDiv = ({ children }) => {
  return (
    <Row>
      <div
        style={{
          background: "#ffff",
          padding: "0 10px 30px 10px",
          width: "100%",
          border: "1px solid #dfd8d8",
        }}
      >
        {children}
      </div>
    </Row>
  );
};
