import { TileProps } from "../types";

export default function Tile({ letter, color, revealed, index }: TileProps) {
  return (
    <div className={revealed ? "tile revealed" : letter ? "tile filled" : "tile"}>
      <div className="tile-front" style={{ transitionDelay: `${index * 300}ms` }}>
        {letter}
      </div>
      <div
        className={color ? `tile-back ${color}` : "tile-back"}
        style={{ transitionDelay: `${index * 300}ms`, animationDelay: `${index * 100}ms` }}
      >
        {letter}
      </div>
    </div>
  );
}
