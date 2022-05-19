import { ButtonProps } from "../types";

const Button = ({
  value,
  color,
  handleKeyDown,
  children,
  isLarge,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={isLarge ? "lg" : color}
      style={{ transitionDelay: "1s" }}
      value={value}
      onClick={handleKeyDown}
    >
      {children}
    </button>
  );
};

export default Button;
