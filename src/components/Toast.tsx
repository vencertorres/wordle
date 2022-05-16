import { useEffect, useState } from "react";
import { ToastProps } from "../types";

const Toast = ({ message, delay = 0 }: ToastProps) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, delay);
  }, [delay]);

  return isShown ? <div className="toast">{message}</div> : null;
};

export default Toast;
