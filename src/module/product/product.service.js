import { ProductModel } from "./product.model.js"; 

class ProductService{
    #model;

    constructor(){
        this.#model = new ProductModel();
    }

    async getCategories(){
        const categories = await this.#model.getCategories();
        return categories;
    }

    async createCategories(name){
        const categories = await this.#model.createCategories(name);
        return categories;
    }

    async updateCategories(id, name){
        const categories = await this.#model.updateCategories(id, name);
        return categories;
    }

    async deleteCategories(id){
        const categories = await this.#model.deleteCategories(id);
        return categories;
    }

    async getCategoriesById(id){
        const categories = await this.#model.getCategoriesById(id);
        return categories;
    }

    async getCategoriesByName(name){
        const categories = await this.#model.getCategoriesByName(name);
        return categories;
    }

    // THIS PART IS FOR SUBCATEGORIES

    async getSubCategories(){
        const subcategories = await this.#model.getSubCategories();
        return subcategories;
    }

    async createSubCategories(name, category_id){
        await this.#model.createSubCategories(name, category_id);
        return null;
    }

    async updateSubCategories(id, name, category_id){
        await this.#model.updateSubCategories(id, name, category_id);
        return null;
    }

    async deleteSubCategories(id){
        await this.#model.deleteSubCategories(id);
        return null;
    }

    async getSubCategoriesById(id){
        const subcategories = await this.#model.getSubCategoriesById(id);
        return subcategories;
    }

    async getSubCategoriesByName(name){
        const subcategories = await this.#model.getSubCategoriesByName(name);
        return subcategories;
    }


    // THIS PART IS FOR PRODUCTS

    async getProducts(){
       const products = await this.#model.getProducts();
       return  products;
    }

    async createProducts(name, price, subcategory_id){
        await this.#model.createProducts(name, price,  subcategory_id);
        return null;
    }

    async updateProducts(id, name, price,  subcategory_id){
        await this.#model.updateProducts(id, name, price, subcategory_id);
        return null;
    }

    async deleteProducts(id){
        await this.#model.deleteProducts(id);
        return null;
    }

    // THIS PART IS FOR PAGINATION

    async getProductsByPage(page, limit){
        const offset = (page - 1) * limit;
        const products = await this.#model.getProductsByPage(limit, offset);
        return products;
    }

    // THIS PART IS FOR SEARCH

    async searchProductsByName(search){
        const products = await this.#model.searchProductsByName(search);
        return products;
    }

    async verifyProduct(id){
        const product = await this.#model.verifyProduct(id);
        return product;
    }
}

export default new ProductService();