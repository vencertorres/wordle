export enum Message {
  Genius,
  Magnificent,
  Splendid,
  Impressive,
  Great,
  Phew,
}

export interface ToastProps {
  message: string | null;
  delay: number;
}

export interface BoardProps {
  board: string[][];
  words: string[];
  word: string;
  solution: string;
  isRowValid: boolean;
}

export interface BoxProps {
  letter?: string;
  color?: string;
  index: number;
  animation?: "zoom" | "flip" | "bounce";
}

export interface KeyboardProps {
  firstRow: Map<string, string>;
  secondRow: Map<string, string>;
  lastRow: Map<string, string>;
  handleKeyDown: (event: any) => void;
}

export interface KeyboardRowProps {
  row: Map<string, string>;
  rowNumber: number;
  handleKeyDown: (event: any) => void;
}

export interface ButtonProps {
  value: string;
  color?: string;
  handleKeyDown: (event: any) => void;
  children: React.ReactNode;
  isLarge: boolean;
}
