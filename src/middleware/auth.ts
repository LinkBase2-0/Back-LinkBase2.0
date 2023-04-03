import { NextFunction, Request, Response } from "express";
import { validateToken } from "../config/token";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>
    }
  }
}

export function validateAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  if (!token) res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) res.sendStatus(401);
  req.user = user;
  next();
}

export function validateRolAdminProviders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  const { user } = validateToken(token);

  if (user.rol === 'adminProviders' || user.rol === 'superAdmin') next()
  else{
    return res.status(401).send(`el usuario no tiene credenciales valida `)
  }
}

export function validateRolChecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  const { user } = validateToken(token);
  try {
    if (user.rol === 'checker' || user.rol === 'superAdmin') next()
  } catch {
    console.log("el usuario no tiene rol correspondiente");
  }
}

export function validateRolSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  const { user } = validateToken(token);
  try {
    if (user.rol === 'admin') next()
  } catch {
    console.log("el usuario no tiene rol correspondiente");
  }
}

// export const validateAdmin = (req, res, next) => {
//   if (!req.user.admin) return res.sendStatus(401)
//   next()
// }
