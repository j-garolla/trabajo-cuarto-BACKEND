import { Router } from "express";
import cartManager from "../src/managers/cartManager.js";

const router = Router();

//endpoint:

router.post("/", adync(req, res) => {
    try {

        //genera automáticamente nuestro cart:
        const cart = await cartManager.createCart();

        res.status(201).json(cart);

    } catch (error) {
        console.log(error);
    }
})

export default router;
