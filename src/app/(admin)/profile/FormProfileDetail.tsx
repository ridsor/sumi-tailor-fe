import { useCallback, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

type Input = {
  name: string;
  email: string;
};

type Validate = Input;

export default () => {
  const [inputs, setInputs] = useState<Input>({
    name: "",
    email: "",
  });

  const [validate, setValidate] = useState<Validate>({
    name: "",
    email: "",
  });

  const onValidate = useCallback(({ name, email }: Input): boolean => {
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

    return result;
  }, []);

  const onSubmitEventHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (onValidate(inputs)) return;
    },
    [inputs]
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
        <label htmlFor="name" className="font-bold block">
          Nama
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            className={`${
              validate.name ? "border-fail pr-11" : ""
            } p-2 border-2 w-full rounded-md relative z-10`}
            onChange={onChangeEventHandler}
            value={inputs.name}
          />
          {validate.name ? (
            <div className="absolute top-0 right-0 left-0 bottom-0">
              <button
                type={"button"}
                className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20"
              >
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
      </div>
      <div className="form-input mb-4 max-w-md w-full">
        <label htmlFor="email" className="font-bold block">
          Email
        </label>
        <div className="relative">
          <input
            type="text"
            id="email"
            name="email"
            className={`${
              validate.email ? "border-fail pr-11" : ""
            } p-2 border-2 w-full rounded-md relative z-10`}
            onChange={onChangeEventHandler}
            value={inputs.email}
          />
          {validate.email ? (
            <div className="absolute top-0 right-0 left-0 bottom-0">
              <button
                type={"button"}
                className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20"
              >
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
      </div>
      <div className="form-input mb-4">
        <button className="px-3 py-2 bg-two text-white rounded-md font-semibold hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)]">
          Simpan
        </button>
      </div>
    </form>
  );
};
