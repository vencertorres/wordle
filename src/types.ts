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
}

export interface BoardProps {
  words: string[];
  word: string;
  solution: string;
  valid: boolean;
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
