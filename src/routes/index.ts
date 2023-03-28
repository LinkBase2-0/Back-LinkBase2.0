import { Router } from "express";
const router = Router();
import routerUsers from "./users";
import routerCategories from "./categories";
import routerProviders from "./providers";
import routerReviews from "./reviews";
import routerCompanie from "./companies";

router.use("/users", routerUsers);
router.use("/categories", routerCategories);
router.use("/providers", routerProviders);
router.use("/reviews", routerReviews);
router.use("/companies", routerCompanie);

export default router;
