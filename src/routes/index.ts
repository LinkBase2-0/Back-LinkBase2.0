import { Router } from "express";
const router = Router();
import routerUsers from "./users";
import routerCategories from "./categories";
import routerProviders from "./providers";

router.use("/users", routerUsers);
router.use("/categories", routerCategories);
router.use("/providers", routerProviders);

export default router;
