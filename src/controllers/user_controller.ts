import { Request, Response } from "express";
import {createUser} from "../services/user_service"

export const user_create_post = async (req: Request,res: Response) => {
    const user = req.body.user;
    const name = req.body.company?.name
    const newUser = await createUser(user,name)
    return res.status(201).send(newUser)
}