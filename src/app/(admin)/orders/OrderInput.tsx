import { FaXmark } from "react-icons/fa6";
import Modal from "@/components/fragments/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "./page";

type Input = {
  name: string;
  email: string;
  nohp: string;
  address: string;
  price: string;
  description: string;
};

type Validate = Input;

export default function OrderInput() {
  const { modal, toggleModal, inputAction, order } = useContext(ModalContext);

  const [inputs, setInputs] = useState<Input>({
    name: "",
    email: "",
    nohp: "",
    address: "",
    price: "",
    description: "",
  });

  const [validate, setValidate] = useState<Validate>({
    name: "",
    email: "",
    nohp: "",
    address: "",
    price: "",
    description: "",
  });

  const onValidate = useCallback(
    ({ name, email, nohp, address, price, description }: Input): boolean => {
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

      // nohp
      if (!nohp) {
        setValidate((prev) => ({
          ...prev,
          nohp: "Kategori tidak boleh kosong",
        }));
        result = true;
      } else if (nohp.length > 100) {
        setValidate((prev) => ({
          ...prev,
          nohp: "Kategori harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          nohp: "",
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

      if (description.length > 500) {
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
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setValidate({
        name: "",
        email: "",
        nohp: "",
        address: "",
        price: "",
        description: "",
      });
      if (onValidate(inputs)) return;
    },
    [inputs, onValidate]
  );

  const onChangeEventHanlder = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  useEffect(() => {
    setInputs({
      name: order.name,
      email: order.email,
      nohp: order.nohp,
      address: order.address,
      price: order.price,
      description: order.description,
    });

    if (inputAction == "create")
      setValidate({
        name: "",
        email: "",
        nohp: "",
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
              onChange={onChangeEventHanlder}
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
              onChange={onChangeEventHanlder}
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
              name="nohp"
              className={`${
                validate.nohp ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHanlder}
              value={inputs.nohp}
            />
            {validate.nohp ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.nohp}</span>
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
              onChange={onChangeEventHanlder}
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
              onChange={onChangeEventHanlder}
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
              onChange={onChangeEventHanlder}
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
