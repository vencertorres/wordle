import { KeyboardRowProps } from "../types";
import Button from "./Button";

const KeyboardRow = ({ row, isLast, handleKeyDown }: KeyboardRowProps) => {
  if (isLast) {
    return (
      <div>
        <Button letter="Enter" handleKeyDown={handleKeyDown} />
        {Array.from(row, ([letter, color]) => (
          <Button
            key={letter}
            letter={letter}
            color={color}
            handleKeyDown={handleKeyDown}
          />
        ))}
        <Button letter="Backspace" handleKeyDown={handleKeyDown}>
          <i className="fa-solid fa-delete-left"></i>
        </Button>
      </div>
    );
  }
  return (
    <div>
      {Array.from(row, ([letter, color]) => (
        <Button
          key={letter}
          letter={letter}
          color={color}
          handleKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
};

export default KeyboardRow;
