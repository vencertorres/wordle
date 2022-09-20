import { ButtonProps } from "../types";

export default function Button({ letter, keyState, big, children, handleKey }: ButtonProps) {
  return (
    <button
      className={big ? "key big" : keyState ? `key ${keyState}` : "key"}
      onClick={() => handleKey(letter)}
    >
      {children || letter}
    </button>
  );
}
