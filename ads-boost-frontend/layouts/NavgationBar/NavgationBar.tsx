"use client";

import Button from "@/components/Button";
import Image from "next/image";
import logo from "@/app/logo.png";

const NavgationBar = () => {

    const handleConnect = () => {

    }

    return (
        <nav className="w-full h-24 px-24 bg-white rounded-lg flex justify-between items-center">
            <Image  src={logo}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="adds-boost logo"
                    className="cursor-pointer w-32"
            />
            <Button text={"Connect Wallet"} type={"button"} onClick={handleConnect}/>
        </nav>
    )
}

export default NavgationBar;
