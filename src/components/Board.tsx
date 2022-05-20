import { useState } from "react";
import { BoardProps } from "../types";
import Box from "./Box";

const initialBoard: string[][] = [];
for (let i = 0; i < 6; i++) {
  const rows: string[] = [];
  for (let j = 0; j < 5; j++) {
    rows.push("");
  }
  initialBoard.push(rows);
}

const Board = ({ words, word, solution, valid }: BoardProps) => {
  const [board] = useState<string[][]>(initialBoard);

  return (
    <div className="board">
      {board.map((row, y) => (
        <div
          key={y}
          className={
            y === words.length && !valid ? "board-row shake" : "board-row"
          }
        >
          {row.map((box, x) => {
            if (y === words.length && word[x]) {
              return (
                <Box key={x} letter={word[x]} index={x} animation={"zoom"} />
              );
            } else if (y < words.length) {
              let color;
              if (words[y][x] === solution[x]) {
                color = "correct";
              } else if (solution.includes(words[y][x])) {
                color = "present";
              } else {
                color = "absent";
              }

              if (words[y] === solution) {
                return (
                  <Box
                    key={x}
                    letter={words[y][x]}
                    color={"correct"}
                    index={x}
                    animation={"bounce"}
                  />
                );
              } else {
                return (
                  <Box
                    key={x}
                    letter={words[y][x]}
                    color={color}
                    index={x}
                    animation={"flip"}
                  />
                );
              }
            }
            return <Box key={x} index={x} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
