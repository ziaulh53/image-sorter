import { notification } from "antd";

export const successNotify = (message) => {
  notification.success({
    message,
    placement: "topRight",
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
