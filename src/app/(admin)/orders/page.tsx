"use client";

import {
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaPlus } from "react-icons/fa6";
import OrderInput from "@/app/(admin)/orders/OrderInput";
import OrderList from "@/app/(admin)/orders/OrderList";
import TokenModal from "./TokenModal";
import OrdedrSearch from "./OrderSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  changePage,
  handlePageOrderFinished,
  handlePageOrderUnfinished,
} from "@/lib/redux/features/ordersSlice";
import { getToken } from "@/services/auth";
import { useSession } from "next-auth/react";

interface OrderInput {
  item_code: string;
  name: string;
  email: string;
  no_hp: string;
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
    item_code: "",
    name: "",
    email: "",
    no_hp: "",
    address: "",
    price: "",
    description: "",
  },
  setOrder: () => {},
});

export default function OrdersPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [isOrderModal, setOrderModal] = useState<boolean>(false);
  const [isTokenModal, setTokenModal] = useState<boolean>(false);
  const [inputAction, setInputAction] = useState<"create" | "edit">("create");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [orderInput, setOrderInput] = useState<OrderInput>({
    item_code: "",
    name: "",
    email: "",
    no_hp: "",
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
  const handleOrderSearch = useCallback(
    (value: string) => {
      clearTimeout(searchTimeout);

      setSearchTimeout(
        setTimeout(() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("s", value);
          router.push(pathname + "?" + params.toString());
        }, 1000)
      );
    },
    [searchTimeout, pathname, searchParams, router]
  );
  const handleCancelOrder = useCallback(
    async (item_code: string) => {
      try {
        const result = await withReactContent(Swal)
          .mixin({
            customClass: {
              confirmButton:
                "bg-success px-3 py-1.5 rounded-md text-white ml-1",
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
          const token = await getToken(session?.user.refreshToken || "");

          const response = await fetch(
            (process.env.NEXT_PUBLIC_API_URL as string) +
              "/api/orders/" +
              item_code,
            {
              method: "DELETE",
              credentials: "include",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          if (response.status != 200) {
            console.error("Failed to cancel");
            return;
          }

          if (
            searchParams.get("page") != null &&
            searchParams.get("page") != "1"
          ) {
            router.push("/orders?page=1");
          } else {
            const search = searchParams.get("s") || "";
            dispatch(
              handlePageOrderFinished({
                page: 1,
                search,
                token: session?.user.refreshToken || "",
              })
            );
            dispatch(
              handlePageOrderUnfinished({
                page: 1,
                search,
                token: session?.user.refreshToken || "",
              })
            );
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, router, searchParams, session]
  );

  const handleStatusChange = useCallback(
    async (item_code: string) => {
      try {
        const token = await getToken(session?.user.refreshToken || "");

        const response = await fetch(
          (process.env.NEXT_PUBLIC_API_URL as string) +
            "/api/orders/" +
            item_code +
            "/status",
          {
            method: "PUT",
            credentials: "include",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status != 200) {
          console.error("Failed to cancel");
          return;
        }

        if (
          searchParams.get("page") != null &&
          searchParams.get("page") != "1"
        ) {
          router.push("/orders?page=1");
        } else {
          const search = searchParams.get("s") || "";
          dispatch(
            handlePageOrderFinished({
              page: 1,
              search,
              token: session?.user.refreshToken || "",
            })
          );
          dispatch(
            handlePageOrderUnfinished({
              page: 1,
              search,
              token: session?.user.refreshToken || "",
            })
          );
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
    },
    [dispatch, router, searchParams, session]
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    } else {
      const page = searchParams.has("page")
        ? Number(searchParams.get("page"))
        : 1;
      const limit = searchParams.has("limit")
        ? Number(searchParams.get("limit"))
        : 5;
      const search = searchParams.get("s") || "";

      dispatch(changePage(page));
      dispatch(
        handlePageOrderUnfinished({
          page,
          limit,
          search,
          token: session?.user.refreshToken || "",
        })
      );
      dispatch(
        handlePageOrderFinished({
          page,
          limit,
          search,
          token: session?.user.refreshToken || "",
        })
      );
    }
  }, [searchParams, dispatch, isLoading, session]);

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
                aria-label="Add Order"
                onClick={() => {
                  toggleOrderModal();
                  setInputAction("create");
                  setOrderInput({
                    item_code: "",
                    name: "",
                    email: "",
                    no_hp: "",
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
                <OrdedrSearch
                  onSearch={handleOrderSearch}
                  value={searchParams.get("s") || ""}
                />
                <OrderList
                  isLoading={isLoading}
                  onCancel={handleCancelOrder}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </article>
          </div>
        </section>
      </main>
    </ModalContext.Provider>
  );
}
