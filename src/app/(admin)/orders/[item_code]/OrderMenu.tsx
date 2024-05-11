"use client";

import { OrderType } from "@/lib/redux/features/ordersSlice";
import {
  FaArrowRotateLeft,
  FaCircleCheck,
  FaEllipsisVertical,
  FaPenToSquare,
} from "react-icons/fa6";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { cancelOrder, changeStatusOrder } from "@/services/orders";
import { FaTimesCircle } from "react-icons/fa";
import { User } from "@/lib/redux/features/userSlice";

interface Props {
  order: OrderType & { item_code: string };
  user: User;
  toggleModal: () => void;
}

export default function OrderMenu(props: Props) {
  const handleBtnActionOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.nextElementSibling?.classList.toggle("active");
  };

  const handleStatusChange = async (item_code: string) => {
    try {
      const isChange = changeStatusOrder(item_code);
      if (!isChange) {
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
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelOrder = async (item_code: string) => {
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
        const isDelete = cancelOrder(item_code);
        if (!isDelete) {
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
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="text-lg flex relative">
        <button
          className="bg-[#F8F8F8] p-3 rounded-md shadow-sm border relative z-20"
          aria-label="Menu Order"
          onClick={handleBtnActionOrder}>
          <FaEllipsisVertical />
        </button>
        <div className="menu-item absolute z-30 top-[calc(100%+1rem)] right-0 w-[250px] pointer-events-none opacity-0 transition-all ease-in">
          <ul className="bg-white gap-1 flex flex-col text-[12px] border rounded-md text-[#172838]">
            {props.order.status == "isFinished" ? (
              <li>
                <button
                  className="hover:bg-[#F8F8F8] p-2 w-full text-left flex items-center gap-x-2"
                  onClick={() => handleStatusChange(props.order.item_code)}>
                  <FaArrowRotateLeft />
                  Pesanan Diproses
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="hover:bg-[#F8F8F8] p-2 w-full text-left flex items-center gap-x-2"
                  onClick={() => handleStatusChange(props.order.item_code)}>
                  <FaCircleCheck />
                  Pesanan Selesai
                </button>
              </li>
            )}
            <li>
              <button
                className="hover:bg-[#F8F8F8] p-2 w-full text-left flex items-center gap-x-2"
                onClick={() => props.toggleModal()}>
                <FaPenToSquare />
                Edit
              </button>
            </li>
            <li>
              <button
                className="hover:bg-[#F8F8F8] p-2 w-full text-left flex items-center gap-x-2"
                onClick={() => handleCancelOrder(props.order.item_code)}>
                <FaTimesCircle />
                Batalkan
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
