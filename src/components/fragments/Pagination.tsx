"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

type Props = {
  page: number;
  totalPages: number;
  status: string;
};

export default function Paginate({ status, totalPages, page }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextPageRef = useRef<HTMLAnchorElement>(null);
  const previousPageRef = useRef<HTMLAnchorElement>(null);

  const [pageAnimation, setPageAnimation] = useState<NodeJS.Timeout>();

  const handleNextPage = () => {
    clearTimeout(pageAnimation);
    nextPageRef.current?.classList.add("nextpage-animation");
    const animate = setTimeout(() => {
      nextPageRef.current?.classList.remove("nextpage-animation");
    }, 200);
    setPageAnimation(animate);
  };
  const handlePreviousPage = () => {
    clearTimeout(pageAnimation);
    previousPageRef.current?.classList.add("previouspage-animation");
    const animate = setTimeout(() => {
      previousPageRef.current?.classList.remove("previouspage-animation");
    }, 200);
    setPageAnimation(animate);
  };

  const handleChangePage = (status: string, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status == "isFinished") {
      params.set("ofpage", String(page));
    } else if (status == "isProcess") {
      params.set("oupage", String(page));
    }
    const url = pathname + "?" + params.toString();
    return url;
  };

  return (
    <div className="pagination flex justify-center flex-row gap-3 font-semibold flex-wrap">
      <div className="w-full lg:w-fit flex justify-center gap-3">
        {page >= 4 ? (
          <Link
            aria-label="Previous page"
            href={handleChangePage(status, 1)}
            className="leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]">
            <FaAnglesLeft />
          </Link>
        ) : (
          ""
        )}
        <Link
          aria-label="Previous page"
          ref={previousPageRef}
          href={handleChangePage(status, page - 1)}
          onClick={() => {
            handlePreviousPage();
          }}
          className={`${
            page < 2 ? "pointer-events-none" : ""
          } leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
          <FaAngleLeft />
        </Link>
      </div>
      {page >= 3 ? (
        <Link
          aria-label="Previous page"
          href={handleChangePage(status, page - 2)}
          onClick={() => {
            handlePreviousPage();
          }}
          className={`leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
          {page - 2}
        </Link>
      ) : (
        ""
      )}
      {page > 1 ? (
        <Link
          aria-label="Previous page"
          href={handleChangePage(status, page - 1)}
          onClick={() => {
            handlePreviousPage();
          }}
          className={`leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
          {page - 1}
        </Link>
      ) : (
        ""
      )}
      <Link
        aria-label="Current page"
        href={handleChangePage(status, page)}
        onClick={() => {
          handlePreviousPage();
        }}
        className={`active pointer-events-none leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
        {page}
      </Link>
      {page < totalPages ? (
        <Link
          aria-label="Next Page"
          href={handleChangePage(status, page + 1)}
          onClick={() => {
            handleNextPage();
          }}
          className={`leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
          {page + 1}
        </Link>
      ) : (
        ""
      )}
      {page <= totalPages - 2 ? (
        <Link
          aria-label="Next Page"
          href={handleChangePage(status, page + 2)}
          onClick={() => {
            handleNextPage();
          }}
          className={`leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
          {page + 2}
        </Link>
      ) : (
        ""
      )}
      <div className="w-full lg:w-fit flex justify-center gap-3">
        <Link
          aria-label="Next Page"
          ref={nextPageRef}
          href={handleChangePage(status, page + 1)}
          onClick={() => {
            handleNextPage();
          }}
          className={`${
            page >= totalPages ? "pointer-events-none" : ""
          } leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
          <FaAngleRight />
        </Link>
        {page <= totalPages - 3 ? (
          <Link
            aria-label="Next Page"
            href={handleChangePage(status, totalPages)}
            onClick={() => {
              handleNextPage();
            }}
            className={`leading-none aspect-square w-9 flex justify-center items-center bg-gray-200 text-base rounded-full text-[#0F0F0F]`}>
            <FaAnglesRight />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
