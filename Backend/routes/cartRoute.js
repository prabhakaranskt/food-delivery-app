import express from "express"
import {addToCart ,removeFromCart,fetchCart,clearCart} from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";
const CartRouter = express.Router();


CartRouter.post("/add",authMiddleware,addToCart)
CartRouter.post("/remove",authMiddleware,removeFromCart)
CartRouter.post("/fetch", authMiddleware,fetchCart)
CartRouter.post("/clear", authMiddleware,clearCart);


export default CartRouter;