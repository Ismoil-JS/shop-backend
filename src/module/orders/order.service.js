import { OrderModel } from "./order.model.js";

class OrderService {
    #orderModel;
    constructor() {
        this.#orderModel = new OrderModel();
    }

    async createOrder({userId, productId}) {
        return await this.#orderModel.createOrder(userId, productId);
    }
}

export default new OrderService;