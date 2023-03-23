import jwt, { JwtPayload } from 'jsonwebtoken'
//import { secret } from '../dotenv.js'
const secret = "palabramagica";

export const generateToken = (payload: object) => {
  const token = jwt.sign({ user: payload }, secret, { expiresIn: "2d" });
  return token;
};

export const validateToken = (token: string) => {
  return jwt.verify(token, secret) as JwtPayload
};
