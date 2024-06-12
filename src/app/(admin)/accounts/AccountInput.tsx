"use client";

import { FaPlus, FaXmark } from "react-icons/fa6";
import Modal from "@/components/fragments/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { getToken } from "@/services/token";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { Input } from "./AccountList";
import { editUser, registerUser } from "@/services/user";

type Validate = {
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
};

interface Props {
  inputs: Input;
  setInputs: (value: Input) => void;
  modal: boolean;
  toggleModal: () => void;
}

export default function AdminInput(props: Props) {
  const searchParams = useSearchParams();

  const [validate, setValidate] = useState<Validate>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isInputLoading, setInputLoading] = useState<boolean>(false);

  const onValidate = useCallback((inputs: Input): boolean => {
    let result = false;

    if (!inputs.data.name) {
      setValidate((prev) => ({ ...prev, name: "Nama tidak boleh kosong!" }));
      result = true;
    } else if (inputs.data.name.length > 100) {
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

    var rs = inputs.data.email;
    var atps = rs.indexOf("@");
    var dots = rs.lastIndexOf(".");
    if (!inputs.data.email) {
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
    } else if (inputs.data.email.length > 100) {
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

    if (inputs.type == "create") {
      const mixedCaseRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
      const numbersRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      const symbolsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
      if (!inputs.data.password) {
        setValidate((prev) => ({
          ...prev,
          password: "Password tidak boleh kosong",
        }));
        result = true;
      } else if (inputs.data.password.length < 8) {
        setValidate((prev) => ({
          ...prev,
          password: "Password harus memiliki min 8 karakter",
        }));
        result = true;
      } else if (inputs.data.password.length > 100) {
        setValidate((prev) => ({
          ...prev,
          password: "Password harus memiliki maks 100 karakter",
        }));
        result = true;
      } else if (!mixedCaseRegex.test(inputs.data.password)) {
        setValidate((prev) => ({
          ...prev,
          password: "Password harus mengandung huruf kapital dan kecil",
        }));
        result = true;
      } else if (!numbersRegex.test(inputs.data.password)) {
        setValidate((prev) => ({
          ...prev,
          password: "Password harus mengandung huruf angka",
        }));
        result = true;
      } else if (!symbolsRegex.test(inputs.data.password)) {
        setValidate((prev) => ({
          ...prev,
          password: "Password harus mengandung karakter khusus",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          password: "",
        }));
      }

      if (inputs.data.password !== inputs.data.confirm_password) {
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
    }

    return result;
  }, []);

  const onSubmitEventHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onValidate(props.inputs)) return;
    setInputLoading(true);

    try {
      if (props.inputs.type == "create") {
        const result = await registerUser({
          name: props.inputs.data.name,
          email: props.inputs.data.email,
          password: props.inputs.data.password ?? "",
        });

        if (result.status != "success") {
          if (
            typeof result.message != "undefined" &&
            result.message == "User limit is 4"
          ) {
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
                title: "Pengguna dibatasi 4",
                showConfirmButton: false,
                timer: 1000,
              });
          }
          if (typeof result.errors.email != "undefined") {
            setValidate((prev) => ({ ...prev, email: result.errors.email }));
          }
          setInputLoading(false);
          return;
        }
      } else {
        const result = await editUser(props.inputs.data?.id ?? "", {
          name: props.inputs.data.name,
          email: props.inputs.data.email,
        });

        if (result.status != "success") {
          if (typeof result.errors.email != "undefined") {
            setValidate((prev) => ({ ...prev, email: result.errors.email }));
          }

          setInputLoading(false);
          return;
        }
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

    setInputLoading(false);
    props.toggleModal();
  };

  const onChangeEventHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setInputs({
      ...props.inputs,
      data: {
        ...props.inputs.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    if (props.inputs.type == "create") {
      props.setInputs({
        ...props.inputs,
        data: {
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        },
      });
    }

    setValidate({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.modal]);

  return (
    <>
      <button
        aria-label="Add account"
        onClick={() => props.toggleModal()}
        className="fixed bottom-5 right-5 p-3 border border-white bg-two text-white rounded-md text-xl hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)] z-40">
        <FaPlus />
      </button>
      <Modal active={props.modal} openclose={props.toggleModal}>
        <div className="container max-w-full">
          <div className="title-modal font-semibold text-xl px-3 py-2 border-b relative">
            {props.inputs.type === "create" ? "Buat" : "Edit"} Akun Admin
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3"
              tabIndex={props.modal ? 1 : undefined}
              onClick={() => props.toggleModal()}
              aria-label="Exit modal">
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
                value={props.inputs.data.name}
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
                value={props.inputs.data.email}
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
            {props.inputs.type !== "edit" && (
              <>
                <div className="form-input mb-3 relative">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={`${
                      validate.password ? "border-fail pr-11" : ""
                    } w-full border rounded-sm py-2 px-3 relative z-10`}
                    onChange={onChangeEventHanlder}
                    value={props.inputs.data.password}
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
                    value={props.inputs.data.confirm_password}
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
              </>
            )}
            <div className="form-input">
              <button
                className="w-full bg-two px-3 py-2 text-white rounded-sm font-semibold"
                type="submit">
                {isInputLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
