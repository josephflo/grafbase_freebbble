import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";

const Navbar = () => {
  const session = {};
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
        {session ? (
          <>
            UserPhoto

            <Link href='/create-project'>
              Share Work
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
