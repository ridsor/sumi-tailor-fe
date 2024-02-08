"use client";

import { FaXmark } from "react-icons/fa6";
import Modal from "@/components/fragments/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import { useCallback, useState } from "react";

type Props = {
  active: boolean;
  opencloseModal: (value: boolean) => void;
};

type Input = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type Validate = Input;

export default function AdminInput({ active, opencloseModal }: Props) {
  const [inputs, setInputs] = useState<Input>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [validate, setValidate] = useState<Validate>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onValidate = useCallback(
    ({ name, email, password, confirm_password }: Input): boolean => {
      let result = false;

      if (!name) {
        setValidate((prev) => ({ ...prev, name: "Nama tidak boleh kosong!" }));
        result = true;
      } else if (name.length > 100) {
        setValidate((prev) => ({
          ...prev,
          name: "Nama harus memiliki maks 100 karakter!",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          name: "",
        }));
      }

      var rs = email;
      var atps = rs.indexOf("@");
      var dots = rs.lastIndexOf(".");
      if (!email) {
        setValidate((prev) => ({
          ...prev,
          email: "Email tidak boleh kosong!",
        }));
        result = true;
      } else if (atps < 1 || dots < atps + 2 || dots + 2 >= rs.length) {
        setValidate((prev) => ({
          ...prev,
          email: "Alamat email tidak valid!",
        }));
        result = true;
      } else if (email.length > 100) {
        setValidate((prev) => ({
          ...prev,
          email: "Email harus memiliki maks 100 karakter!",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          email: "",
        }));
      }

      let passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!password) {
        setValidate((prev) => ({
          ...prev,
          password: "Password tidak boleh kosong!",
        }));
        result = true;
      } else if (password.length > 100) {
        setValidate((prev) => ({
          ...prev,
          password: "Password harus memiliki maks 100 karakter!",
        }));
        result = true;
      } else if (!passwordRegex.test(password)) {
        setValidate((prev) => ({
          ...prev,
          password: "Password tidak memenuhi standar keamanan!",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          password: "",
        }));
      }

      if (password !== confirm_password) {
        setValidate((prev) => ({
          ...prev,
          confirm_password:
            "Konfirmasi password harus cocok dengan password yang telah dimasukkan!",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          confirm_password: "",
        }));
      }

      return result;
    },
    []
  );

  const onSubmitEventHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (onValidate(inputs)) return;
    },
    [inputs, onValidate]
  );

  const onChangeEventHanlder = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  return (
    <Modal active={active} openclose={opencloseModal}>
      <div className="container max-w-full">
        <div className="title-modal font-semibold text-xl px-3 py-2 border-b relative">
          Tambah Admin
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3"
            tabIndex={active ? 1 : undefined}
            onClick={() => opencloseModal(false)}>
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
                validate.name ? "border-fail pr-11" : ""
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
              type="text"
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
              type="password"
              placeholder="Password"
              name="password"
              className={`${
                validate.password ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHanlder}
              value={inputs.password}
            />
            {validate.password ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.password}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="password"
              placeholder="Konfirmasi Password"
              name="confirm_password"
              className={`${
                validate.confirm_password ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10`}
              onChange={onChangeEventHanlder}
              value={inputs.confirm_password}
            />
            {validate.confirm_password ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.confirm_password}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input">
            <button className="w-full bg-two px-3 py-2 text-white rounded-sm font-semibold">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
