"use client";

import { SetStateAction, createContext, useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import OrderInput from "@/app/(admin)/orders/OrderInput";
import OrderList from "@/app/(admin)/orders/OrderList";
import TokenModal from "./TokenModal";

interface OrderInput {
  id: number;
  name: string;
  email: string;
  nohp: string;
  address: string;
  price: string;
  description: string;
}

export const ModalContext = createContext<{
  modal: boolean;
  toggleModal: () => void;
  inputAction: "create" | "edit";
  setInputAction: (value: SetStateAction<"create" | "edit">) => void;
  order: OrderInput;
  setOrder: (value: SetStateAction<OrderInput>) => void;
}>({
  modal: false,
  toggleModal: () => {},
  inputAction: "create",
  setInputAction: () => {},
  order: {
    id: 0,
    name: "",
    email: "",
    nohp: "",
    address: "",
    price: "",
    description: "",
  },
  setOrder: () => {},
});

export default function OrdersPage() {
  const [isOrderModal, setOrderModal] = useState<boolean>(false);
  const [isTokenModal, setTokenModal] = useState<boolean>(false);
  const [inputAction, setInputAction] = useState<"create" | "edit">("create");
  const [orderInput, setOrderInput] = useState<OrderInput>({
    id: 0,
    name: "",
    email: "",
    nohp: "",
    address: "",
    price: "",
    description: "",
  });

  const toggleOrderModal = useCallback(() => {
    setOrderModal((prev) => !prev);
  }, []);
  const toggleTokenModal = useCallback(() => {
    setTokenModal((prev) => !prev);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modal: isOrderModal,
        toggleModal: toggleOrderModal,
        inputAction,
        setInputAction,
        order: orderInput,
        setOrder: setOrderInput,
      }}>
      <main>
        <section className="py-16">
          <div className="container">
            <article className="px-4">
              <button
                onClick={() => {
                  toggleOrderModal();
                  setInputAction("create");
                  setOrderInput({
                    id: 0,
                    name: "",
                    email: "",
                    nohp: "",
                    address: "",
                    price: "",
                    description: "",
                  });
                }}
                className="fixed bottom-5 right-5 p-3 border border-white bg-two text-white rounded-md text-xl hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)] z-40">
                <FaPlus />
              </button>
              <OrderInput />
              <div className="relative">
                <h2 className="text-2xl font-bold mb-2">Daftar Pesanan</h2>
                <button
                  className="text-gray-500 mb-4"
                  onClick={() => toggleTokenModal()}>
                  Token pendaftaran pesanan
                </button>
                <TokenModal
                  active={isTokenModal}
                  openclose={toggleTokenModal}
                />
                <OrderList />
              </div>
            </article>
          </div>
        </section>
      </main>
    </ModalContext.Provider>
  );
}
