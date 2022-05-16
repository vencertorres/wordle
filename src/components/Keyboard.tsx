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
      <KeyboardRow
        row={firstRow}
        isLast={false}
        handleKeyDown={handleKeyDown}
      />
      <KeyboardRow
        row={secondRow}
        isLast={false}
        handleKeyDown={handleKeyDown}
      />
      <KeyboardRow row={lastRow} isLast={true} handleKeyDown={handleKeyDown} />
    </div>
  );
};

export default Keyboard;
