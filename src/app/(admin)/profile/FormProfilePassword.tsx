import { useCallback, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

type Input = {
  oldPassword: string;
  newPassword: string;
};

type Validate = Input;

export default function FormProfilePassword() {
  const [inputs, setInputs] = useState<Input>({
    oldPassword: "",
    newPassword: "",
  });
  const [validate, setValidate] = useState<Validate>({
    oldPassword: "",
    newPassword: "",
  });

  const onValidate = useCallback(
    ({ oldPassword, newPassword }: Input): boolean => {
      let result = false;

      if (!oldPassword) {
        setValidate((prev) => ({
          ...prev,
          oldPassword: "Password lama tidak boleh kosong!",
        }));
        result = true;
      } else if (oldPassword.length > 100) {
        setValidate((prev) => ({
          ...prev,
          oldPassword: "Password lama harus memiliki maks 100 karakter!",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          oldPassword: "",
        }));
      }

      if (!newPassword) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Password baru tidak boleh kosong!",
        }));
        result = true;
      } else if (newPassword.length > 100) {
        setValidate((prev) => ({
          ...prev,
          newPassword: "Passowrd baru harus memiliki maks 100 karakter!",
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

  const onSubmitEventHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (onValidate(inputs)) return;
    },
    [inputs, onValidate]
  );

  const onChangeEventHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  return (
    <form method="post" onSubmit={onSubmitEventHandler}>
      <div className="form-input mb-4 max-w-md w-full">
        <label htmlFor="oldPassword" className="font-bold block">
          Password Lama
        </label>
        <div className="relative">
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            className={`${
              validate.oldPassword ? "border-fail pr-11" : ""
            } p-2 border-2 w-full rounded-md relative z-10`}
            onChange={onChangeEventHandler}
            value={inputs.oldPassword}
          />
          {validate.oldPassword ? (
            <div className="absolute top-0 right-0 left-0 bottom-0">
              <button
                type={"button"}
                className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                <FaExclamationCircle />
              </button>
              <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                <span>{validate.oldPassword}</span>
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
              validate.oldPassword ? "border-fail pr-11" : ""
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
          Simpan
        </button>
      </div>
    </form>
  );
}
