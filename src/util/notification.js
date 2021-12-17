import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";

export const successNotify = (message) => {
  notification.success({
    message,
    placement: "topRight",
    icon: <SmileOutlined />,
  });
};

export const warnNotify = (message) => {
  notification.warn({
    message,
    placement: "topRight",
  });
};

export const errorNotify = (message) => {
  notification.error({
    message,
    placement: "topRight",
  });
};
