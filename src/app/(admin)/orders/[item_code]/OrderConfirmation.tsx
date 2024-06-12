"use client";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { orderConfirmation } from "@/services/orders";

interface Props {
  item_code: string;
}

export default function OrderConfirmation(props: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleOrderConfirmation = async () => {
    try {
      const result = await withReactContent(Swal)
        .mixin({
          customClass: {
            confirmButton: "bg-success px-3 py-1.5 rounded-md text-white ml-1",
            cancelButton: "bg-fail px-3 py-1.5 rounded-md text-white mr-1",
          },
          buttonsStyling: false,
        })
        .fire({
          title: "Apa kamu yakin?",
          text: "Anda tidak akan dapat mengembalikan ini!",
          showCancelButton: true,
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
          reverseButtons: true,
        });

      if (result.isConfirmed) {
        setLoading(true);

        const result = await orderConfirmation(props.item_code);
        console.log(result);
        if (!result) {
          withReactContent(Swal)
            .mixin({
              customClass: {
                popup: "max-w-[200px] w-full h-[100px]",
                icon: "!scale-50 -translate-y-8",
                title: "text-sm -translate-y-[4.5rem]",
              },
              buttonsStyling: false,
            })
            .fire({
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 500,
            });

          setLoading(false);
          return;
        }

        withReactContent(Swal)
          .mixin({
            customClass: {
              popup: "max-w-[200px] w-full h-[100px]",
              icon: "scale-50 -translate-y-8",
            },
            buttonsStyling: false,
          })
          .fire({
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            timer: 500,
          });

        setTimeout(async () => {
          setLoading(false);
          router.push("/orders");
        }, 500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="py-3 px-6 bg-two text-white mt-5 rounded-md font-bold tracking-wider uppercase mx-auto block"
      onClick={handleOrderConfirmation}>
      {!loading ? "Konfirmasi" : "Loading..."}
    </button>
  );
}
