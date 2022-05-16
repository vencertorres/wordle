import { BoardProps } from "../types";
import Box from "./Box";

const Board = ({ board, words, word, solution, isRowValid }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, y) => (
        <div
          className={`board-row ${
            y === words.length && isRowValid ? "shake" : ""
          }`}
        >
          {row.map((color, x) => {
            if (y === words.length && word[x]) {
              return (
                <Box key={x} letter={word[x]} index={x} animation={"zoom"} />
              );
            } else if (words[y]) {
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
              }
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
            return <Box key={x} index={x} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
