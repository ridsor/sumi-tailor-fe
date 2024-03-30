import { FaXmark } from "react-icons/fa6";
import Modal from "@/components/fragments/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "./page";
import { getToken } from "@/services/token";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  handlePageOrderFinished,
  handlePageOrderUnfinished,
} from "@/lib/redux/features/ordersSlice";

type Input = {
  name: string;
  email: string;
  no_hp: string;
  address: string;
  price: string;
  description: string;
};

type Validate = Input;

export default function OrderInput() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { modal, toggleModal, inputAction, order } = useContext(ModalContext);
  const [InputLoading, setInputLoading] = useState<boolean>(false);

  const [inputs, setInputs] = useState<Input>({
    name: "",
    email: "",
    no_hp: "",
    address: "",
    price: "",
    description: "",
  });

  const [validate, setValidate] = useState<Validate>({
    name: "",
    email: "",
    no_hp: "",
    address: "",
    price: "",
    description: "",
  });

  const onValidate = useCallback(
    ({ name, email, no_hp, address, price, description }: Input): boolean => {
      let result: boolean = false;

      // name
      if (!name) {
        setValidate((prev) => ({ ...prev, name: "Nama tidak boleh kosong" }));
        result = true;
      } else if (name.length > 100) {
        setValidate((prev) => ({
          ...prev,
          name: "Nama harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          name: "",
        }));
      }

      // email
      var rs = email;
      var atps = rs.indexOf("@");
      var dots = rs.lastIndexOf(".");
      if (!email) {
        setValidate((prev) => ({
          ...prev,
          email: "Email tidak boleh kosong",
        }));
        result = true;
      } else if (atps < 1 || dots < atps + 2 || dots + 2 >= rs.length) {
        setValidate((prev) => ({
          ...prev,
          email: "Email tidak valid",
        }));
        result = true;
      } else if (email.length > 100) {
        setValidate((prev) => ({
          ...prev,
          email: "Email harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          email: "",
        }));
      }

      // no_hp
      if (!no_hp) {
        setValidate((prev) => ({
          ...prev,
          no_hp: "Kategori tidak boleh kosong",
        }));
        result = true;
      } else if (no_hp.length > 100) {
        setValidate((prev) => ({
          ...prev,
          no_hp: "Kategori harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          no_hp: "",
        }));
      }

      // address
      if (!address) {
        setValidate((prev) => ({
          ...prev,
          address: "Kategori tidak boleh kosong",
        }));
        result = true;
      } else if (address.length > 100) {
        setValidate((prev) => ({
          ...prev,
          address: "Kategori harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          address: "",
        }));
      }

      // price
      if (isNaN(parseInt(price)) && price !== "") {
        setValidate((prev) => ({
          ...prev,
          price: "Harga harus angka",
        }));
        result = true;
      } else if (price.length > 500) {
        setValidate((prev) => ({
          ...prev,
          price: "Harga harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          price: "",
        }));
      }

      if (!description) {
        setValidate((prev) => ({
          ...prev,
          description: "Deskripsi tidak boleh kosong",
        }));
        result = true;
      } else if (description.length > 500) {
        setValidate((prev) => ({
          ...prev,
          description: "Deskripsi harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          description: "",
        }));
      }

      return result;
    },
    []
  );

  const onSubmitEventHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setValidate({
        name: "",
        email: "",
        no_hp: "",
        address: "",
        price: "",
        description: "",
      });

      if (onValidate(inputs)) return;

      setInputLoading(true);

      try {
        if (inputAction == "edit") {
          const token = await getToken();

          if (token.status != "success") {
            console.error("Failed to input");
            setInputLoading(false);
            return;
          }

          const inputResponse = await fetch(
            (process.env.NEXT_PUBLIC_API_URL as string) +
              "/api/orders/" +
              order.item_code,
            {
              method: "PUT",
              body: JSON.stringify(inputs),
              credentials: "include",
              headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer " + token.authorization.access_token,
              },
            }
          );

          if (inputResponse.status != 200) {
            const result = await inputResponse.json();
            console.error("Failed to input");
            if (typeof result.errors.email != "undefined") {
              setValidate((prev) => ({ ...prev, email: result.errors.email }));
            }
            if (typeof result.errors.no_hp != "undefined") {
              setValidate((prev) => ({ ...prev, no_hp: result.errors.no_hp }));
            }
            setInputLoading(false);
            return;
          }
        } else if (inputAction == "create") {
          const inputResponse = await fetch(
            (process.env.NEXT_PUBLIC_API_URL as string) + "/api/orders",
            {
              method: "POST",
              body: JSON.stringify(inputs),
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (inputResponse.status != 201) {
            const result = await inputResponse.json();
            console.error("Failed to input");
            if (typeof result.errors.email != "undefined") {
              setValidate((prev) => ({ ...prev, email: result.errors.email }));
            }
            if (typeof result.errors.no_hp != "undefined") {
              setValidate((prev) => ({ ...prev, no_hp: result.errors.no_hp }));
            }
            setInputLoading(false);
            return;
          }
        }
        if (
          searchParams.get("page") != null &&
          searchParams.get("page") != "1"
        ) {
          router.push("/orders?page=1");
        } else {
          const search = searchParams.get("s") || "";
          dispatch(handlePageOrderFinished({ page: 1, search }));
          dispatch(handlePageOrderUnfinished({ page: 1, search }));
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
        console.log(e);
      }

      toggleModal();
      setInputLoading(false);
    },
    [
      order.item_code,
      inputs,
      onValidate,
      toggleModal,
      dispatch,
      router,
      searchParams,
      inputAction,
    ]
  );

  const onChangeEventHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  useEffect(() => {
    setValidate({
      name: "",
      email: "",
      no_hp: "",
      address: "",
      price: "",
      description: "",
    });

    setInputs({
      name: order.name,
      email: order.email,
      no_hp: order.no_hp,
      address: order.address,
      price: order.price,
      description: order.description,
    });

    if (inputAction == "create")
      setValidate({
        name: "",
        email: "",
        no_hp: "",
        address: "",
        price: "",
        description: "",
      });
  }, [order, inputAction]);

  return (
    <Modal active={modal} openclose={toggleModal}>
      <div className="container max-w-full">
        <div className="title-modal font-semibold text-xl px-3 py-2 border-b relative">
          {inputAction === "create" ? "Buat" : "Edit"} Pesanan
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3"
            aria-label="Exit Modal"
            onClick={() => toggleModal()}>
            <FaXmark />
          </button>
        </div>
        <form method="post" className="p-4" onSubmit={onSubmitEventHandler}>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="Nama"
              name="name"
              className={`${
                validate.name ? "border-fail pr-11 relative" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHandler}
              value={inputs.name}
            />
            {validate.name ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.name}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className={`${
                validate.email ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHandler}
              value={inputs.email}
            />
            {validate.email ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.email}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="No Handphone"
              name="no_hp"
              className={`${
                validate.no_hp ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHandler}
              value={inputs.no_hp}
            />
            {validate.no_hp ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.no_hp}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="Alamat"
              name="address"
              className={`${
                validate.address ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHandler}
              value={inputs.address}
            />
            {validate.address ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.address}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="Harga"
              name="price"
              className={`${
                validate.price ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHandler}
              value={inputs.price}
            />
            {validate.price ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.price}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <textarea
              name="description"
              placeholder="Deskripsi"
              rows={3}
              className={`${
                validate.description ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHandler}
              value={inputs.description}></textarea>
            {validate.description ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.description}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input">
            <button className="w-full bg-two px-3 py-2 text-white rounded-sm font-semibold">
              {InputLoading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
