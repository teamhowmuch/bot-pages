import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import avatar from "../../public/images/avatar.png";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import { Container } from "./Container";

type Props = {};

type NavBarItemProps = {
  label: string;
  to: string;
};

function NavBarItem({ label, to }: NavBarItemProps) {
  return (
    <Link href={to} passHref>
      <a>
        <Button size="sm" variant="neutral" mode="default">
          {label}
        </Button>
      </a>
    </Link>
  );
}

export function Navbar(props: Props) {
  return (
    <div className="text-center bg-white py-1">
      <Container>
        <div className="flex px-3 items-center">
          <div className="w-36 flex-0 flex gap-1">
            {/* <NavBarItem to="/companies" label="Explore" />
            <NavBarItem to="/profile" label="Profile" /> */}
          </div>

          <div className="flex flex-1 items-center justify-center gap-2">
            <div style={{ width: 35 }}>
              <Image
                src={avatar}
                height={35}
                width={35}
                alt={`avatar-grobot`}
              />
            </div>
            <h1 className="font-bold">grobot</h1>
          </div>
          <div className="w-36 flex flex-0 gap-3 justify-end">
            {/* <Link href="/me" passHref>
            <a>
              <Button
                size="sm"
                variant="neutral"
                mode="default"
                iconLeft={faUser}
              >
                Profile
              </Button>
            </a>
          </Link> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
