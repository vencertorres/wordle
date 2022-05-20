import { BoxProps } from "../types";

const Box = ({ letter, color, index, animation }: BoxProps) => {
  const delays = [0.2, 0.4, 0.6, 0.8, 1];

  let box = "box";
  let front = "box-front";
  let back = "box-back";
  const style = { transitionDelay: "0s", animationDelay: "0s" };

  switch (animation) {
    case "zoom":
      front += " active zoom-in-zoom-out";
      break;
    case "flip":
      box += " flip";
      front += " active";
      back += " " + color;
      style.transitionDelay = delays[index] + "s";
      break;
    case "bounce":
      box += " flip bounce";
      front += " " + color;
      back += " " + color;
      style.transitionDelay = delays[index] + "s";
      style.animationDelay = 1 + delays[index] + "s";
      break;
  }

  return (
    <div className={box} style={style}>
      <div
        className={front}
        style={
          animation === "bounce"
            ? { transitionDelay: 1 + delays[index] + "s" }
            : style
        }
      >
        {letter}
      </div>
      <div className={back}>{letter}</div>
    </div>
  );
};

export default Box;
