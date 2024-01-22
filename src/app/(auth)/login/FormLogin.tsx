"use client";

import { useState } from "react";

interface InputsLogin {
  email: string;
  password: string;
}

export default function FormLogin() {
  const [inputsLogin, setInputsLogin] = useState<InputsLogin>({
    email: "",
    password: "",
  });
  const [validate, setValidate] = useState<InputsLogin>({
    email: "",
    password: "",
  });

  const handleSubmitFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidationLogin()) return;
  };

  const handleValidationLogin = (): boolean => {
    var result = false;
    var email: string = "";
    var password: string = "";

    // email
    var rs = inputsLogin.email;
    var atps = rs.indexOf("@");
    var dots = rs.lastIndexOf(".");
    if (!inputsLogin.email) {
      email = "Email tidak boleh kosong";
      result = true;
    } else if (atps < 1 || dots < atps + 2 || dots + 2 >= rs.length) {
      email = "Alamat email tidak valid";
      result = true;
    }

    // password
    if (!inputsLogin.password) {
      password = "Password tidak boleh kosong.";
      result = true;
    }

    setValidate({
      email,
      password,
    });

    return result;
  };

  const handleChangeInputLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmitFormLogin} method="post">
      <div className="form-input mb-4 relative">
        <input
          type="text"
          name="email"
          id="email"
          autoFocus
          className={`${
            validate.email ? "border-fail" : "border-two"
          } px-4 py-2 bg-three w-full border-2 rounded-md font-semibold outline-none`}
          onChange={handleChangeInputLogin}
        />
        <label
          htmlFor="email"
          className={`${
            validate.email ? "text-fail" : "text-two"
          } absolute -top-2 left-3 bg-three px-2 text-[13px] font-bold`}
        >
          {validate.email ? validate.email : "Email"}
        </label>
      </div>
      <div className="form-input mb-3 relative">
        <input
          type="password"
          name="password"
          id="password"
          className={`${
            validate.password ? "border-fail" : "border-two"
          } px-4 py-2 bg-three w-full border-2 rounded-md font-semibold outline-none`}
          onChange={handleChangeInputLogin}
        />
        <label
          htmlFor="password"
          className={`${
            validate.password ? "text-fail" : "text-two"
          } absolute -top-2 left-3 bg-three px-2 text-[13px] font-bold`}
        >
          {validate.password ? validate.password : "Password"}
        </label>
      </div>
      <div className="form-input flex gap-2 mb-4">
        <input
          type="checkbox"
          name="remember_me"
          id="remember_me"
          className="accent-two"
        />
        <label htmlFor="remember_me">Remember Me</label>
      </div>
      <div className="form-input mb-2">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-two text-three rounded-md font-bold text-lg"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
