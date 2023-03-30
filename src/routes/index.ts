import { Router } from "express";
const router = Router();
import routerUsers from "./users";
import routerServices from "./services";
import routerProviders from "./providers";
import routerReviews from "./reviews";
import routerCompanie from "./companies";
import routerCategory from "./categories";

router.use("/users", routerUsers);
router.use("/services", routerServices);
router.use("/providers", routerProviders);
router.use("/reviews", routerReviews);
router.use("/companies", routerCompanie);
router.use("/categories", routerCategory);

export default router;
