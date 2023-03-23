import { Router } from "express";
const router = Router();
import routerUsers from "./users";
import routerCategories from "./categories";

router.use("/users", routerUsers);
router.use("/categories", routerCategories);

export default router;
