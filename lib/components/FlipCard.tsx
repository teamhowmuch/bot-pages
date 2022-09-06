import { ReactElement, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  text: string;
  emoji: string;
  children: ReactElement;
  bgColor?: string;
  color?: string;
};

export function FlipCard({
  text,
  emoji,
  children,
  bgColor = "rgb(240, 220, 40)",
  color = "black",
}: Props) {
  const [isFlipped, setFlipped] = useState(false);

  return (
    <div className="h-48 w-full" style={{ perspectiveOrigin: "1000px" }}>
      <div
        className={`text-center relative h-full w-full`}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 500ms",
        }}
      >
        <div
          className={`absolute w-full h-full cursor-pointer rounded-xl  p-3`}
          onClick={() => setFlipped(true)}
          style={{
            backgroundColor: bgColor,
            color,
            backfaceVisibility: "hidden",
          }}
        >
          <h1 className="font-bold">{text}</h1>
          <h1 className="text-6xl py-3">{emoji}</h1>
        </div>

        <div
          className={`absolute w-full h-full rounded-xl bg-blue-300 p-3`}
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: bgColor,
            color,
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className="w-12 h-6 cursor-pointer "
            onClick={() => setFlipped(false)}
          >
            <FaArrowLeft />
          </div>
          {children}
        </div>
      </div>

      <div className="items-center justify-center"></div>
    </div>
  );
}
