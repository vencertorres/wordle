import { forwardRef } from "react";
import { BoardProps, Ref } from "../types";
import Row from "./Row";

const Board = forwardRef<Ref, BoardProps>((props, ref) => {
  const { boardState, currentRowIndex, success } = props;

  let rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(
      i === currentRowIndex ? (
        <Row
          key={i}
          word={boardState[i]}
          success={i === currentRowIndex - 1 && success}
          ref={ref}
        />
      ) : (
        <Row key={i} word={boardState[i]} success={i === currentRowIndex - 1 && success} />
      )
    );
  }

  return (
    <div className="board-container">
      <div>{rows}</div>
    </div>
  );
});

export default Board;
