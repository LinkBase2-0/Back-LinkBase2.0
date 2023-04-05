import jwt, { JwtPayload } from "jsonwebtoken";

import { secret } from "../dotenv";

const SECRET = secret || "NombreErroneo";

export const generateToken = (payload: object) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "2d" });
  return token;
};

export const validateToken = (token: string) => {
  return jwt.verify(token, SECRET) as JwtPayload;
};
