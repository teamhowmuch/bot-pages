import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import avatar from "../../public/images/avatar.png";
import {
  faComment,
  faUser,
  faUserCircle,
  faUserCog,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { useAuth } from "../hooks";

type Props = {};

type NavBarItemProps = {
  label: string;
  to: string;
  icon?: IconDefinition;
};

function NavBarItem({ label, to, icon }: NavBarItemProps) {
  return (
    <Link href={to} passHref>
      <a>
        <Button size="sm" variant="neutral" mode="default">
          {icon ? <Icon icon={icon} size="2x" /> : label}
        </Button>
      </a>
    </Link>
  );
}

export function Navbar(props: Props) {
  const { user, loadingInitial } = useAuth();

  return (
    <div className="text-center bg-white py-1">
      <Container>
        <div className="flex px-3 items-center">
          <div className="w-36 flex-0 flex gap-1">
            {/* <NavBarItem to="/home" label="Home" /> */}
            {/* <NavBarItem to="/explore" label="Explore" /> */}
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
            {loadingInitial ? null : user ? (
              <Link href="/profile" passHref>
                <a>
                  <Button size="sm">
                    &nbsp;{user.email.slice(0, 1).toUpperCase()}&nbsp;
                  </Button>
                </a>
              </Link>
            ) : (
              <Link href="/auth/login" passHref>
                <a>
                  <Button>Login</Button>
                </a>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
