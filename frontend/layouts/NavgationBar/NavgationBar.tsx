"use client";

import Button from "@/components/Button";
import Image from "next/image";
// import logo from "@/app/logo.png";
import logo from "@/public/logo.svg";

const NavgationBar = () => {
  const handleConnect = () => {};

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
      <div className="flex-none gap-4">
        <span className="badge badge-primary bg-gradient-to-r from-primary to-secondary">
          0x123...456
        </span>
        <Button
          text={"Connect Wallet"}
          type={"button"}
          onClick={handleConnect}
        />
      </div>
    </nav>
  );
};

export default NavgationBar;
