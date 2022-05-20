import { ToastProps } from "../types";

const Toast = ({ message }: ToastProps) => {
  return message ? <div className="toast">{message}</div> : null;
};

export default Toast;
