import { KeyboardProps } from "../types";
import KeyboardRow from "./KeyboardRow";

const Keyboard = ({
  firstRow,
  secondRow,
  lastRow,
  handleKeyDown,
}: KeyboardProps) => {
  return (
    <div className="keyboard">
      <KeyboardRow row={firstRow} rowNumber={1} handleKeyDown={handleKeyDown} />
      <KeyboardRow
        row={secondRow}
        rowNumber={2}
        handleKeyDown={handleKeyDown}
      />
      <KeyboardRow row={lastRow} rowNumber={3} handleKeyDown={handleKeyDown} />
    </div>
  );
};

export default Keyboard;
