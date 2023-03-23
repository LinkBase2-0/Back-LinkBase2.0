import { Router } from "express";
const router = Router();
import routerUsers from "./users";

router.use("/users", routerUsers);

export default router;
