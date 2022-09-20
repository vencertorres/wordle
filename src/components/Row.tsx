import { forwardRef } from "react";
import { LetterState, Ref, RowProps } from "../types";
import Tile from "./Tile";

const Row = forwardRef<Ref, RowProps>((props, ref) => {
  const { word, success } = props;

  let tiles = [];
  for (let i = 0; i < 5; i++) {
    let letter = "",
      color = LetterState.Initial;
    if (word[i]) {
      letter = Object.keys(word[i]).toString();
      color = word[i][letter];
    }

    tiles.push(
      <Tile
        key={i}
        letter={letter}
        color={color}
        revealed={color !== LetterState.Initial}
        index={i}
      />
    );
  }

  return (
    <div ref={ref} className={success ? "row success" : "row"}>
      {tiles}
    </div>
  );
});

export default Row;
