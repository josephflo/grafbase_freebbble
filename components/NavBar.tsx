import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";

const Navbar = async () => {
  const session = await getCurrentUser();
  console.log(session)

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
        <Link href="/" className="justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          <Image
            src="/logo.svg"
            alt="logo"
            height={43}
            width={115}
            className="object-contain md:flex md:justify-center"
          />
        </Link>
      </div>


      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title="Share Work" />
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
