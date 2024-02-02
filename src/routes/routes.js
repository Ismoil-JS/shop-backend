import { Router } from "express";
import { productRouter } from "../module/product/product.routes.js";
import {UserRouter} from "../module/user/user.routes.js";
import {orderRouter} from "../module/orders/order.routes.js";

export const router = Router()
 .use(productRouter)
 .use(UserRouter)
 .use(orderRouter)