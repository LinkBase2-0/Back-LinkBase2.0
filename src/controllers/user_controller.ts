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

export const user_create_post = async (req: Request, res: Response) => {
  const user = req.body.user;
  const name = req.body.company?.name;
  const newUser = await createUser(user, name);
  return res.status(201).send(newUser);
};

export const user_login_post = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const logUser = await loggedUser(email, password);
  if (logUser.message) {
    return res.status(401).send(logUser.message);
  } else {
    res.cookie("token", logUser.token, { httpOnly: true });
    return res.send(logUser.payload);
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
  const { email } = req.params;
  try {
    const getUser = await getUserByEmail(email);
    if (getUser.user) res.status(200).send(getUser.user);
  } 
  catch (error) {
    // console.error(getUser.error)
    // res.status(404).send(getUser.error)
    next(error);
    //throw new Error(getUser.error)
  }
};

export const get_all_user = async (req: Request, res: Response) => {
  const users = await findAllUser();
  if (users.all) res.status(200).send(users.all);
  else {
    console.error(users.error);
    res.status(404);
  }
};

export const put_user_byEmail = async (req: Request, res: Response) => {
    //const { email } = req.params;
    const { token } = req.cookies;
    const { user } = validateToken(token);
    const email= user.email
    const body = req.body
    const obj = {
        where: { email },
        returning: true,
      }
    const userUpdated = await updateUserEmail(body, obj )
    res.status(200).send(userUpdated)
}

export const delete_user = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const userToDelete = await getUserByEmail(email);
    const userDeleted = await deleteUser(email);
    res.status(200).send(userToDelete);
  } catch (error) {
    console.log(error);
  }
}

