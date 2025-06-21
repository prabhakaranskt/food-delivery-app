import express from "express"
import authMiddleware from "../middleware/auth.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

import { placeOrder, getOrderById,getUserOrders,getAllOrdersForAdminPanel,updateOrderStatusInAdminPanel } from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.get("/userOrders",authMiddleware,getUserOrders)
orderRouter.get("/adminOrders",getAllOrdersForAdminPanel)
orderRouter.put("/update-status",updateOrderStatusInAdminPanel)


export default orderRouter;