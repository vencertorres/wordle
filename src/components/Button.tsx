import { ButtonProps } from "../types";

const Button = ({ letter, color, handleKeyDown, children }: ButtonProps) => {
  if (children) {
    return (
      <button
        type="button"
        className={color}
        value={letter}
        onClick={handleKeyDown}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      className={color}
      value={letter}
      onClick={handleKeyDown}
    >
      {letter}
    </button>
  );
};

export default Button;
