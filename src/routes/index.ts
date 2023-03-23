import { Router } from "express";
const router = Router();
import routerUser from "./users";

router.use("/users", routerUser);

export default router;
