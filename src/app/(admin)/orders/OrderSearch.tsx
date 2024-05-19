"use client";

import { FaSearch } from "react-icons/fa";

type Props = {
  onSearch: (value: string) => void;
  value: string;
};

export default function OrdedrSearch(props: Props) {
  return (
    <div className="search relative w-full max-w-[400px]">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 pr-8 py-2 rounded-md border  w-full"
        onChange={(e) => props.onSearch(e.target.value)}
        defaultValue={props.value}
      />
      <button
        className="absolute top-1/2 -translate-y-1/2 right-3"
        aria-label="Search"
        disabled={true}>
        <FaSearch />
      </button>
    </div>
  );
}
