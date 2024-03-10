import {
  FaArrowRotateLeft,
  FaCircleCheck,
  FaEllipsisVertical,
  FaPenToSquare,
} from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { getDay, getMonth, getTime } from "@/utils/order";
import { useContext } from "react";
import { ModalContext } from "./page";
import { OrderType } from "@/lib/redux/features/ordersSlice";

interface Props {
  order: OrderType;
  onCancel: (item_code: string) => void;
  onStatusChange: (item_code: string) => void;
}

export default function OrderItem(props: Props) {
  const { toggleModal, setInputAction, setOrder } = useContext(ModalContext);

  const handleBtnActionOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    const menuItem = document.querySelectorAll(".menu-item");
    menuItem.forEach((x) => {
      x.classList.remove("active");
    });
    e.currentTarget.nextElementSibling?.classList.add("active");
  };

  return (
    <div className="order flex border rounded-md shadow-sm flex-wrap">
      <div className="flex flex-col relative items-center px-8 lg:px-10 py-2.5 after:content-[''] after:block after:h-[70%] w-1 after:border-r after:absolute after:-translate-y-1/2 after:top-1/2 after:right-0 order-1 self-center">
        <div className="month font-medium leading-none">
          {getMonth(props.order.updated_at)}
        </div>
        <div className="tgl font-medium text-3xl leading-none">
          {getDay(props.order.updated_at)}
        </div>
        <div className="time leading-none text-[12px]">
          {getTime(props.order.updated_at)}
        </div>
      </div>
      <div className="order-2 flex-1 lg:flex-none">
        <div className="px-3 lg:px-6 py-2.5 flex flex-col justify-center min-h-full">
          <div className="name text-[13px] font-medium text-gray-600 mb-1">
            {props.order.name}
          </div>
          <div className="category leading-none text-[13px]">
            {props.order.no_hp}
          </div>
          <div className="price text-[13px] text-gray-600 font-medium">
            {props.order.email}
          </div>
        </div>
      </div>
      <div className="order-4 lg:order-3 w-full lg:w-auto">
        <div className="px-3 lg:px-6 pb-2.5 md:py-2.5 flex flex-col justify-center min-h-full lg:max-w-[300px]">
          <div className="price text-[13px] text-gray-600 font-medium">
            Rp
            {props.order.price
              ? new Intl.NumberFormat("id-ID").format(props.order.price)
              : " -"}
          </div>
          <div className="name text-[13px] font-medium text-gray-600">
            Alamat
          </div>
          <div className="address leading-none text-[13px]">
            {props.order.address}
          </div>
        </div>
      </div>
      <div className="description order-4  text-[13px] self-center w-full lg:w-0 lg:flex-1 p-2 lg:p-0 lg:py-2.5 lg:border-t-0 border-t">
        {props.order.description ? props.order.description : "-"}
      </div>
      <div className="order-3 lg:order-6 text-lg self-center ml-auto lg:mx-6 p-2 flex relative">
        <button
          className="bg-[#F8F8F8] p-3 rounded-md shadow-sm border relative"
          onClick={handleBtnActionOrder}>
          <FaEllipsisVertical />
        </button>
        <div className="menu-item absolute top-[calc(100%+.5rem)] right-0 w-[250px] pointer-events-none opacity-0 transition-all ease-in z-10">
          <ul className="bg-white p-1 gap-1 flex flex-col text-[12px] border rounded-md text-[#172838]">
            {props.order.status == "isFinished" ? (
              <li>
                <button
                  className="hover:bg-[#F8F8F8] px-2.5 w-full text-left flex items-center gap-x-2"
                  onClick={() => props.onStatusChange(props.order.item_code)}>
                  <FaArrowRotateLeft />
                  Belum Selesai
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="hover:bg-[#F8F8F8] px-2.5 w-full text-left flex items-center gap-x-2"
                  onClick={() => props.onStatusChange(props.order.item_code)}>
                  <FaCircleCheck />
                  Selesai
                </button>
              </li>
            )}
            <li>
              <button
                className="hover:bg-[#F8F8F8] px-2.5 w-full text-left flex items-center gap-x-2"
                onClick={() => {
                  toggleModal();
                  setInputAction("edit");
                  setOrder({
                    item_code: props.order.item_code,
                    name: props.order.name,
                    email: props.order.email,
                    no_hp: props.order.no_hp,
                    address: props.order.address,
                    price:
                      props.order.price === null
                        ? ""
                        : props.order.price.toString(),
                    description:
                      props.order.description === null
                        ? ""
                        : props.order.description,
                  });
                }}>
                <FaPenToSquare />
                Edit
              </button>
            </li>
            <li>
              <button
                className="hover:bg-[#F8F8F8] px-2.5 w-full text-left flex items-center gap-x-2"
                onClick={() => props.onCancel(props.order.item_code)}>
                <FaTimesCircle />
                Batalkan
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
