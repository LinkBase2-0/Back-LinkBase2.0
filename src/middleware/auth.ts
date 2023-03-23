import { NextFunction, Request, Response } from "express";
import { validateToken } from "../config/token";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>
    }
  }
}

export function validateAuth(
  req: Request,
  res: Response,
  next: NextFunction
){
  const { token } = req.cookies;
  if (!token) res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) res.sendStatus(401);
  console.log("userrrrrr ---->", user);

  req.user = user;
  next();
}

// export const validateAdmin = (req, res, next) => {
//   if (!req.user.admin) return res.sendStatus(401)
//   next()
// }
