import { Router } from "express";
const router = Router();
import routerUsers from "./users";
import routerServices from "./services";
import routerProviders from "./providers";
import routerReviews from "./reviews";
import routerCompanie from "./companies";

router.use("/users", routerUsers);
router.use("/services", routerServices);
router.use("/providers", routerProviders);
router.use("/reviews", routerReviews);
router.use("/companies", routerCompanie);

export default router;
