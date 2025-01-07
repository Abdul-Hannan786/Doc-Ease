"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type SidebarType = {
  navData: { name: string; icon: string; url: string }[];
};

const MobileNavigation = ({ navData }: SidebarType) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src={"/images/logo-full-brand.png"}
        alt="logo"
        width={150}
        height={72}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image src={"/images/menu.svg"} alt="Search" width={30} height={30} />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={"/images/user.png"}
                alt="Avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">Abdul Hannan</p>
                <p className="caption">abdulhannanhere@gmail.com</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20 w-0" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navData.map(({ name, url, icon }) => (
                <Link href={url} key={name} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active"
                    )}
                  >
                    <Image
                      src={icon}
                      alt="name"
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active"
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
           <Separator className="my-5 bg-light-200/20 w-0" />
           <div className="flex flex-col justify-between gap-5 pb-5">
           <Button type="submit" className="mobile-sign-out-button">
            <Image
              src={"/images/logout.svg"}
              alt="logout"
              width={24}
              height={24}
            />
            <p>Logout</p>
          </Button>
           </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
