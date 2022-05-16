import { BoxProps } from "../types";

const Box = ({ letter, color, index, animation }: BoxProps) => {
  const delays = [0.2, 0.4, 0.6, 0.8, 1];

  switch (animation) {
    case "bounce":
      return (
        <div
          className="box flip bounce"
          style={{
            transitionDelay: delays[index] + "s",
            animationDelay: 1 + delays[index] + "s",
          }}
        >
          <div
            className={"box-front " + color}
            style={{
              transitionDelay: 1 + delays[index] + "s",
            }}
          >
            {letter}
          </div>
          <div className={"box-back " + color}>{letter}</div>
        </div>
      );
    case "flip":
      return (
        <div
          className="box flip"
          style={{
            transitionDelay: delays[index] + "s",
          }}
        >
          <div className="box-front active">{letter}</div>
          <div className={"box-back " + color}>{letter}</div>
        </div>
      );
    case "zoom": {
      return (
        <div className="box">
          <div className="box-front active zoom-in-zoom-out">{letter}</div>
          <div className="box-back">{letter}</div>
        </div>
      );
    }
    default:
      return (
        <div className="box">
          <div className="box-front"></div>
          <div className="box-back"></div>
        </div>
      );
  }
};

export default Box;
