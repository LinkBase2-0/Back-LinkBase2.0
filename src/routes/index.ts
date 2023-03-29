import { Router } from "express";
const router = Router();
import routerUsers from "./users";
import routerServices from "./services";
import routerProviders from "./providers";
import routerReviews from "./reviews";
import routerCompanie from "./companies";
import routerCategory from "./category";

router.use("/users", routerUsers);
router.use("/services", routerServices);
router.use("/providers", routerProviders);
router.use("/reviews", routerReviews);
router.use("/companies", routerCompanie);
router.use("/category", routerCategory);

export default router;
