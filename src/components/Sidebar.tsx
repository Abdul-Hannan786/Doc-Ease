"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarType = {
  navData: { name: string; icon: string; url: string }[];
};

const Sidebar = ({ navData }: SidebarType) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href={"/doctor"}>
        <Image
          src={"/images/logo-full-brand.png"}
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src={"/images/logo-brand.svg"}
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navData.map(({ name, url, icon }) => (
            <Link href={url} key={name} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
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
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="sidebar-user-info">
        <Image
          src={"/images/user.png"}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">Abdul Hannan</p>
          <p className="caption">abdulhannanhere@gmail.com</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
