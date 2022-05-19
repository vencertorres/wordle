import { KeyboardRowProps } from "../types";
import Button from "./Button";

const KeyboardRow = ({ row, rowNumber, handleKeyDown }: KeyboardRowProps) => {
  return (
    <div className="keyboard-row">
      {rowNumber === 2 && <div className="spacer"></div>}
      {rowNumber === 3 && (
        <Button value="Enter" handleKeyDown={handleKeyDown} isLarge={true}>
          Enter
        </Button>
      )}
      {Array.from(row, ([letter, color]) => (
        <Button
          key={letter}
          value={letter}
          color={color}
          handleKeyDown={handleKeyDown}
          isLarge={false}
        >
          {letter}
        </Button>
      ))}
      {rowNumber === 2 && <div className="spacer"></div>}
      {rowNumber === 3 && (
        <Button value="Backspace" handleKeyDown={handleKeyDown} isLarge={true}>
          <i className="fa-solid fa-delete-left"></i>
        </Button>
      )}
    </div>
  );
};

export default KeyboardRow;
