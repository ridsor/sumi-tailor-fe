"use server";

import jwt from "jsonwebtoken";

export const getTokenRegisterOrder = async () => {
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 },
    process.env.REGISTER_ORDER_JWT_SECRET as string
  );

  const url = process.env.BASE_URL + "/register-order?token=" + token;

  return url;
};
