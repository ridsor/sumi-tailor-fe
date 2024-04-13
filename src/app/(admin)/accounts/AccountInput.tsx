"use client";

import { FaXmark } from "react-icons/fa6";
import Modal from "@/components/fragments/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { AccountModalContext } from "./page";
import { getToken } from "@/services/token";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { getUser } from "@/lib/redux/features/userSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

type Props = {
  active: boolean;
  opencloseModal: () => void;
  loadUsers: (search?: string) => void;
};

type Input = {
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
};

type Validate = Input;

export default function AdminInput(props: Props) {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { inputAction, accountInput } = useContext(AccountModalContext);

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
  const [isInputLoading, setInputLoading] = useState<boolean>(false);

  const onValidate = useCallback(
    (
      { name, email, password, confirm_password }: Input,
      inputAction: string
    ): boolean => {
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

      if (inputAction == "create") {
        const mixedCaseRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
        const numbersRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        const symbolsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
        if (!password) {
          setValidate((prev) => ({
            ...prev,
            password: "Password tidak boleh kosong",
          }));
          result = true;
        } else if (password.length < 8) {
          setValidate((prev) => ({
            ...prev,
            password: "Password harus memiliki min 8 karakter",
          }));
          result = true;
        } else if (password.length > 100) {
          setValidate((prev) => ({
            ...prev,
            password: "Password harus memiliki maks 100 karakter",
          }));
          result = true;
        } else if (!mixedCaseRegex.test(password)) {
          setValidate((prev) => ({
            ...prev,
            password: "Password harus mengandung huruf kapital dan kecil",
          }));
          result = true;
        } else if (!numbersRegex.test(password)) {
          setValidate((prev) => ({
            ...prev,
            password: "Password harus mengandung huruf angka",
          }));
          result = true;
        } else if (!symbolsRegex.test(password)) {
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
      }

      return result;
    },
    []
  );

  const onSubmitEventHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (onValidate(inputs, inputAction)) return;
      setInputLoading(true);

      try {
        const token = await getToken();
        if (inputAction == "create") {
          const body = JSON.stringify({
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
          });

          const response = await fetch(
            (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token?.authorization.access_token,
              },
              body,
            }
          );

          if (response.status != 201) {
            const result = await response.json();
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
          const body = JSON.stringify({
            name: inputs.name,
            email: inputs.email,
          });

          const response = await fetch(
            (process.env.NEXT_PUBLIC_API_URL as string) +
              "/api/users/" +
              accountInput.id,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token?.authorization.access_token,
              },
              body,
            }
          );

          if (response.status != 200) {
            const result = await response.json();
            if (typeof result.errors.email != "undefined") {
              setValidate((prev) => ({ ...prev, email: result.errors.email }));
            }

            setInputLoading(false);
            return;
          }

          dispatch(getUser());
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

        const search = searchParams.get("s") || "";
        props.loadUsers(search);
      } catch (e) {
        console.error(e);
      }

      setInputLoading(false);
      props.opencloseModal();
    },
    [
      inputs,
      onValidate,
      props,
      inputAction,
      accountInput.id,
      searchParams,
      dispatch,
    ]
  );

  const onChangeEventHanlder = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  useEffect(() => {
    if (inputAction == "create") {
      setInputs({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } else {
      setInputs({
        name: accountInput.name,
        email: accountInput.email,
      });
    }
    setValidate({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  }, [accountInput, inputAction]);

  return (
    <Modal active={props.active} openclose={props.opencloseModal}>
      <div className="container max-w-full">
        <div className="title-modal font-semibold text-xl px-3 py-2 border-b relative">
          {inputAction === "create" ? "Buat" : "Edit"} Akun Admin
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3"
            tabIndex={props.active ? 1 : undefined}
            onClick={() => props.opencloseModal()}
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
          {inputAction !== "edit" && (
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
  );
}
