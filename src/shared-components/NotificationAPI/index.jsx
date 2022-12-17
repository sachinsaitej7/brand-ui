import { notification } from "antd";

const NotificationAPI = ({ title, message, type, placement }) => {
  notification[type]({
    message: title,
    description: message,
    placement: placement,
  });
};

export default NotificationAPI;
