import { Router } from "express";
const router = Router();
import routerUser from "./users";

router.use("/user", routerUser);
// router.use("/provider");
// router.use("/reviews");
// router.use("/categories");

export default router;
