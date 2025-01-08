"use client";

import Image from "next/image";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image src={"/images/search.svg"} alt="search" width={24} height={24} />
        <Input className="search-input" placeholder="Search..." />
      </div>
    </div>
  );
};

export default Search;
