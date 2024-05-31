"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function AccountSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  const handleAccountSearch = (value: string) => {
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
    <div className="search relative w-full max-w-[400px] mb-3">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 pr-8 py-1 rounded-md border  w-full"
        onChange={(e) => handleAccountSearch(e.target.value)}
        defaultValue={searchParams.get("s") ?? ""}
      />
      <button
        className="absolute top-1/2 -translate-y-1/2 right-3"
        disabled={true}>
        <FaSearch />
      </button>
    </div>
  );
}
