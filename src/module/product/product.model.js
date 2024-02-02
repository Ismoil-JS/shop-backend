import  {Postgres} from "../../config/postgres.js"

export class ProductModel{
    #postgres;

    constructor(){
        this.#postgres = new Postgres();
    }

    async getCategories(){
        const query = `SELECT * FROM categories`;
        const categories = await this.#postgres.fetch(query);
        return categories;
    }

    async createCategories(name){
        const query = `INSERT INTO categories(name) VALUES($1) RETURNING *`;
        const categories = await this.#postgres.fetch(query, name);
        return categories;
    }

    async updateCategories(id, name){
        const query = `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`;
        const categories = await this.#postgres.fetch(query, name, id);
        return categories;
    }

    async deleteCategories(id){
        const query = `DELETE FROM categories WHERE id = $1 RETURNING *`;
        const categories = await this.#postgres.fetch(query, id);
        return categories;
    }

    async getCategoriesById(id){
        const query = `SELECT * FROM categories WHERE id = $1`;
        const categories = await this.#postgres.fetch(query, id);
        return categories;
    }

    async getCategoriesByName(name){
        const query = `SELECT * FROM categories WHERE name = $1`;
        const categories = await this.#postgres.fetch(query, name);
        return categories;
    }

    // THIS PART IS FOR SUBCATEGORIES

    async getSubCategories(){
        const query = `SELECT * FROM subcategories`;
        const subcategories = await this.#postgres.fetch(query);
        return subcategories;
    }

    async createSubCategories(name, category_id){
        const query = `INSERT INTO subcategories(name, categoryId) VALUES($1, $2)`;
        const subcategories = await this.#postgres.fetch(query, name, category_id);
        return subcategories;
    }

    async updateSubCategories(id, name, category_id){
        const query = `UPDATE subcategories SET name = $1, categoryId = $2 WHERE id = $3 RETURNING *`;
        const subcategories = await this.#postgres.fetch(query, name, category_id, id);
        return subcategories;
    }

    async deleteSubCategories(id){
        const query = `DELETE FROM subcategories WHERE id = $1 RETURNING *`;
        const subcategories = await this.#postgres.fetch(query, id);
        return subcategories;
    }

    async getSubCategoriesById(id){
        const query = `SELECT * FROM subcategories WHERE id = $1`;
        const subcategories = await this.#postgres.fetch(query, id);
        return subcategories;
    }

    async getSubCategoriesByName(name){
        const query = `SELECT * FROM subcategories WHERE name = $1`;
        const subcategories = await this.#postgres.fetch(query, name);
        return subcategories;
    }


    //  THIS PART IS FOR PRODUCTS

    async getProducts(){
        const query = `SELECT * FROM products`;
        const products = await this.#postgres.fetch(query);
        return products;
    }

    async createProducts(name, price, subcategory_id){
        const query = `INSERT INTO products(name, price, subcategoryId) VALUES($1, $2, $3)`;
        const products = await this.#postgres.fetch(query, name, price, subcategory_id);
        return products;
    }

    async updateProducts(id, name, price, subcategory_id){
        const query = `UPDATE products SET name = $1, price = $2, subcategoryId = $3 WHERE id = $4 RETURNING *`;
        const products = await this.#postgres.fetch(query, name, price, subcategory_id, id);
        return products;
    }

    async deleteProducts(id){
        const query = `DELETE FROM products WHERE id = $1 RETURNING *`;
        const products = await this.#postgres.fetch(query, id);
        return products;
    }

    // THIS PART IS FOR PAGINATION

    async getProductsByPage(page, limit){
        const query = `SELECT * FROM products LIMIT $1 OFFSET $2`;
        const products = await this.#postgres.fetch(query, page, limit);
        return products;
    }

    // THIS PART IS FOR SEARCH

    async searchProductsByName(search){
        const query = `SELECT * FROM products WHERE name ILIKE $1`;
        const products = await this.#postgres.fetch(query, `%${search}%`);
        return products;
    }

    async verifyProduct(id){
        const query = `SELECT * FROM products WHERE id = $1`;
        const products = await this.#postgres.fetch(query, id);
        return products;
    }
}