import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            width={115}
            height={43}
            alt="logo-Flexibbble"
          />
        </Link>
      </div>
      <ul className="xl:flex hidden text-small gap-7">
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.key}>
            <li>{link.text}</li>
          </Link>
        ))}
      </ul>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="session-image"
                width={40}
                height={40}
              />
            )}

            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
