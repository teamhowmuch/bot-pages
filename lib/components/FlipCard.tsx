import { ReactElement, useState } from "react";

type Props = { text: string; emoji: string; children: ReactElement };

export function FlipCard({ text, emoji, children }: Props) {
  const [isFlipped, setFlipped] = useState(false);

  return (
    <div
      className="h-48 w-full cursor-pointer "
      style={{ perspectiveOrigin: "1000px" }}
      onClick={() => setFlipped(!isFlipped)}
    >
      <div
        className={`text-center relative h-full w-full  `}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 500ms",
        }}
      >
        <div
          className={`absolute w-full h-full rounded-xl bg-blue-300  p-3`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <h1>{text}</h1>
          <h1 className="text-6xl py-3">{emoji}</h1>
        </div>

        <div
          className={`absolute w-full h-full rounded-xl bg-blue-300 p-3`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {children}
        </div>
      </div>

      <div className="items-center justify-center"></div>
    </div>
  );
}
