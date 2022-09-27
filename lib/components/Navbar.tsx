import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";

type Props = {};

export function Navbar(props: Props) {
  return (
    <div className="text-center bg-white py-1">
      <div className="flex px-3 items-center">
        <div className="w-36"></div>
        <div className="flex-grow">
          <h1 className="text-xl">🤖 grobot</h1>
        </div>
        <div className="w-36 flex justify-end">
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
