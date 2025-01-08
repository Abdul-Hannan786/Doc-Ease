"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Search from "./Search";

const Header = () => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <form>
          <Button type="submit" className="sign-out-button">
            <Image
              src={"/images/logout.svg"}
              alt="logout"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
