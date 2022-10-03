import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import avatar from "../../public/images/avatar.png";

type Props = {};

export function Navbar(props: Props) {
  return (
    <div className="text-center bg-white py-1">
      <div className="flex px-3 items-center">
        <div className="w-36 flex-0"></div>

        <div className="flex flex-1 items-center justify-center gap-2">
          <div style={{ width: 35 }}>
            <Image src={avatar} height={35} width={35} alt={`avatar-grobot`} />
          </div>
          <h1 className="font-bold">grobot</h1>
        </div>
        <div className="w-36 flex flex-0 justify-end">
          <Link
            href="https://landbot.pro/v3/H-1344766-1F4J8SWG83O073XV/index.html"
            target="_blank"
            passHref
          >
            <a>
              <Button size="sm" variant="action" mode="outlined">
                Feedback
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
