import { Router } from "express";
import productRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";
const router = Router();

//Indexamos nuestros 2 endpoints:
router.use("/products", productRouters);
router.use("/carts", cartsRouters);

export default router;
