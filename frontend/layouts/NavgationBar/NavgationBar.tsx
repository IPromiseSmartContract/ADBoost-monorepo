"use client";

import { ConnectKitButton } from "connectkit";

import Image from "next/image";
import logo from "@/public/logo.svg";

const NavgationBar = () => {

  return (
    <nav className="navbar bg-base-100 py-4 px-24">
      <div className="flex-1">
        <Image
          src={logo}
          width={0}
          height={0}
          sizes="100vw"
          alt="adboost logo"
          className="cursor-pointer w-10"
        />
        <a className="btn btn-ghost text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ADBoost
        </a>
      </div>
      <div className="flex-none">
       <ConnectKitButton />
      </div>
    </nav>
  );
};

export default NavgationBar;
