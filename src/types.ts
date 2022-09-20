export enum LetterState {
  Initial = "",
  Correct = "correct",
  Present = "present",
  Absent = "absent",
}

export type Ref = HTMLDivElement;

export interface Letter {
  [letter: string]: LetterState;
}

export interface BoardProps {
  boardState: Letter[][];
  currentRowIndex: number;
  success: boolean;
}

export interface RowProps {
  word: Letter[];
  success: boolean;
}

export interface TileProps {
  letter: string;
  color: LetterState;
  revealed: boolean;
  index: number;
}

export interface KeyboardProps {
  keyState: Letter;
  handleKey: (e: KeyboardEvent | string) => void;
}

export interface KeybordRowProps {
  keys: string;
  keyState: Letter;
  leftElem?: React.ReactNode;
  rightElem?: React.ReactNode;
  handleKey: (e: KeyboardEvent | string) => void;
}

export interface ButtonProps {
  letter: string;
  keyState?: LetterState;
  big: boolean;
  children?: React.ReactNode;
  handleKey: (e: KeyboardEvent | string) => void;
}
