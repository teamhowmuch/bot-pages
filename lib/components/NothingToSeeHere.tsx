import Image from "next/image";
import IdkGif from "../../public/gifs/trump_idk.gif";

export function NothingToSeeHere() {
  return (
    <div className="py-5 rounded">
      <div className="py-10 text-center">
        <h1 className="text-3xl">Nothing to see here</h1>
        <div className="py-6 flex justify-center">
          <Image src={IdkGif} alt="i don't know" width={480} height={233} />
        </div>
      </div>
    </div>
  );
}
