import { Router } from "express";
import  ProductController from "./product.controller.js";

const router = Router();
export const productRouter = router
    .get('/categories', ProductController.getCategories)
    .post('/categories', ProductController.createCategories)
    .patch('/categories/:id', ProductController.updateCategories)
    .delete('/categories/:id', ProductController.deleteCategories)
    // THIS PART IS FOR SUBCATEGORIES
    .get('/subcategories', ProductController.getSubCategories)
    .post('/subcategories', ProductController.createSubCategories)
    .patch('/subcategories/:id', ProductController.updateSubCategories)
    .delete('/subcategories/:id', ProductController.deleteSubCategories)
    // THIS PART IS FOR PRODUCTS
    .get('/products', ProductController.getProducts)
    .post('/products', ProductController.createProducts)
    .patch('/products/:id', ProductController.updateProducts)
    .delete('/products/:id', ProductController.deleteProducts)
    // THIS PART IS FOR PAGINATION
    .get('/products/pagination', ProductController.getProductsPagination)
    // THIS PART IS FOR SEARCH
    .get('/products/search', ProductController.searchProductsByName)

  