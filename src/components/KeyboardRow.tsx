import { KeybordRowProps } from "../types";
import Button from "./Button";

export default function KeyboardRow(props: KeybordRowProps) {
  const { keys, keyState, leftElem, rightElem, handleKey } = props;

  let buttons = [];
  for (const letter of keys) {
    buttons.push(
      <Button
        key={letter}
        keyState={keyState[letter]}
        letter={letter}
        big={false}
        handleKey={handleKey}
      />
    );
  }

  return (
    <div className="keyboard-row">
      {leftElem}
      {buttons}
      {rightElem}
    </div>
  );
}
