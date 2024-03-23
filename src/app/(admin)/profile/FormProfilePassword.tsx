import { User } from "@/lib/redux/features/userSlice";
import { getToken } from "@/services/token";
import { SetStateAction, useCallback, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

type Input = {
  password: string;
  newPassword: string;
};

type Validate = Input;

interface Props {
  user: User;
  isChangePassword: boolean;
  setChangePassword: (value: SetStateAction<boolean>) => void;
}

export default function FormProfilePassword(props: Props) {
  const [isInputLoading, setInputLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<Input>({
    password: "",
    newPassword: "",
  });
  const [validate, setValidate] = useState<Validate>({
    password: "",
    newPassword: "",
  });

  const onValidate = useCallback(
    ({ password, newPassword }: Input): boolean => {
      let result = false;

      if (!password) {
        setValidate((prev) => ({
          ...prev,
          password: "Password lama tidak boleh kosong",
        }));
        result = true;
      } else if (password.length > 100) {
        setValidate((prev) => ({
          ...prev,
          password: "Password lama harus memiliki maks 100 karakter",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          password: "",
        }));
      }

      const mixedCaseRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
      const numbersRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      const symbolsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
      if (!newPassword) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Password tidak boleh kosong",
        }));
        result = true;
      } else if (newPassword.length < 8) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Password harus memiliki min 8 karakter",
        }));
        result = true;
      } else if (newPassword.length > 100) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Password harus memiliki maks 100 karakter",
        }));
        result = true;
      } else if (!mixedCaseRegex.test(newPassword)) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Password harus mengandung huruf kapital dan kecil",
        }));
        result = true;
      } else if (!numbersRegex.test(newPassword)) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Password harus mengandung huruf angka",
        }));
        result = true;
      } else if (!symbolsRegex.test(newPassword)) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Password harus mengandung karakter khusus",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          newPassword: "",
        }));
      }

      return result;
    },
    []
  );

  const onSubmitEventHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputLoading(true);

    if (onValidate(inputs)) return;

    try {
      const token = await getToken();

      if (token.status != "success") {
        setInputLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("password", inputs.password);
      formData.append("newPassword", inputs.newPassword);
      formData.append("profile", "true");

      const response = await fetch(
        (process.env.NEXT_PUBLIC_API_URL as string) +
          "/api/users/" +
          props.user.id,
        {
          body: formData,
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + token.authorization.access_token,
          },
        }
      );

      if (response.status != 200) {
        const result = await response.json();
        setInputLoading(false);
        if (typeof result.errors.password != "undefined") {
          setValidate((prev) => ({
            ...prev,
            password: result.errors.password,
          }));
        }
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

      setInputs({
        password: "",
        newPassword: "",
      });
      setInputLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form method="post" onSubmit={onSubmitEventHandler}>
      <button
        type="button"
        onClick={() => props.setChangePassword((prev: boolean) => !prev)}
        className="px-3 mb-4 py-2 bg-gray-200 text-one rounded-md font-semibold hover:bg-gray-300 focus:ring focus:ring-[rgba(209,213,219,.5)]">
        {props.isChangePassword ? "Ubah Detail" : "Ubah Password"}
      </button>
      <div className="form-input mb-4 max-w-md w-full">
        <label htmlFor="password" className="font-bold block">
          Password Lama
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            className={`${
              validate.password ? "border-fail pr-11" : ""
            } p-2 border-2 w-full rounded-md relative z-10`}
            onChange={onChangeEventHandler}
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
      </div>
      <div className="form-input mb-4 w-full max-w-md">
        <label htmlFor="newPassword" className="font-bold block">
          Password Baru
        </label>
        <div className="relative">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className={`${
              validate.newPassword ? "border-fail pr-11" : ""
            } p-2 border-2 w-full rounded-md relative z-10`}
            onChange={onChangeEventHandler}
            value={inputs.newPassword}
          />
          {validate.newPassword ? (
            <div className="absolute top-0 right-0 left-0 bottom-0">
              <button
                type={"button"}
                className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                <FaExclamationCircle />
              </button>
              <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                <span>{validate.newPassword}</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="form-input mb-4">
        <button className="px-3 py-2 bg-two text-white rounded-md font-semibold hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)]">
          {isInputLoading ? "Loading..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
