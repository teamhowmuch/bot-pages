import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";

type Props = {};

export function Navbar(props: Props) {
  return (
    <div className="text-center bg-white py-1">
      <Container>
        <div className="flex items-center">
          <div className="flex-grow">
            <h1 className="text-xl">🤖 grobot</h1>
          </div>
          <div>
            <Link
              href="https://landbot.pro/v3/H-1344766-1F4J8SWG83O073XV/index.html"
              target="_blank"
            >
              <Button size="sm">Give feedback</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
