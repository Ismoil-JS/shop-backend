import { Router } from "express";
import orderController from "./order.controller.js";
import VerifyAccessMiddleware from "../../middleware/id-verify.middleware.js";

const router = Router();

export const orderRouter = router.post(
    "/orders/:productId",
    VerifyAccessMiddleware, // Pass the middleware function without invoking it
    orderController.createOrder
);

