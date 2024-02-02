import productService from "../product/product.service.js";
import orderService from "./order.service.js";

class OrderController {
    async createOrder(req, res) {
        const { id } = req.body;
        const { productId } = req.params;
        
        const [product] = await productService.verifyProduct(productId);

        if (!product) {
            res.status(404).json({
                message: "Product not found",
            });
        }
        else{
            await orderService.createOrder({userId: id , productId});
            res.status(200).json({
                message: "Order created successfully",
            });
        }

    }


}

export default new OrderController;