"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function OrderSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  const handleOrderSearch = (value: string) => {
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("s", value);
        router.push(pathname + "?" + params.toString());
      }, 1000)
    );
  };

  return (
    <div className="search relative w-full max-w-[400px]">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 pr-8 py-2 rounded-md border  w-full"
        onChange={(e) => handleOrderSearch(e.target.value)}
        defaultValue={searchParams.get("s") || ""}
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
