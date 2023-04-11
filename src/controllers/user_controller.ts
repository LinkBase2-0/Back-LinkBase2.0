import { Request, Response, NextFunction } from "express";
import { validateToken } from "../config/token";
import {
  createUser,
  loggedUser,
  getUserByEmail,
  findAllUser,
  updateUserEmail,
  deleteUser,
} from "../services/user_service";

export const user_create_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user;
  const name = req.body.company?.name;
  try {
    const newUser = await createUser(user, name);
    return res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

export const user_login_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const logUser = await loggedUser(email, password);
  if (logUser.message) {
    return res.status(401).send(logUser.message);
  } else {
    //res.cookie("token", logUser.token, { httpOnly: true });
    //logUser es un objeto con payload y token que se envia al front
    return res.send(logUser);
  }
};

export const user_logout_post = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

export const get_user_byEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const getUser = await getUserByEmail(parseInt(id));
    if (getUser.user) return res.status(200).send(getUser.user);
  } catch (error) {
    next(error);
  }
};

export const get_all_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUser();
    if (users.all) return res.status(200).send(users.all);
  } catch (error) {
    next(error);
  }
};

export const put_user_byEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  const body = req.body;
  const obj = {
    where: { email },
    returning: true,
  };
  try {
    const userUpdated = await updateUserEmail(body, obj);
    return res.status(200).send(userUpdated);
  } catch (error) {
    next(error);
  }
};

export const delete_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const userToDelete = await getUserByEmail(parseInt(id));
    await deleteUser(id);
    return res.status(200).send(userToDelete);
  } 
  catch (error) {
    next(error);
  }
}

