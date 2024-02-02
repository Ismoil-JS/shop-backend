import  ProductService  from "./product.service.js";

class ProductController{

    async getCategories(_, res){
        const categories = await ProductService.getCategories();
        res.json(categories);
    }

    async createCategories(req, res){
        const { name } = req.body;

        const findCategories = await ProductService.getCategoriesByName(name);
        if(findCategories.length){
            return res.status(409).json({
                message: `Categories with name ${name} already exists`,
            });
        }
        const categories = await ProductService.createCategories(name);
        res.json(categories);
    }

    async updateCategories(req, res){
        const { id } = req.params;
        const { name } = req.body;

        const findCategories = await ProductService.getCategoriesById(id);

        if(findCategories.length === 0){  
            return res.status(404).json({
                message: `Categories with id ${id} not found`,
            });
        }
        await ProductService.updateCategories(id, name);
        res.status(200).json();
    }

    async deleteCategories(req, res){
        const {id} = req.params;

        const findCategories = await ProductService.getCategoriesById(id);

        if(findCategories.length === 0){
            return res.status(404).json({
                message: `Categories with id ${id} not found`,
            });
        }
        await ProductService.deleteCategories(id);
        res.status(200).json({
            message: `Categories with id ${id} was deleted`,
        });
    }



    // THIS PART IS FOR SUBCATEGORIES

    async getSubCategories(_, res){
        const subcategories = await ProductService.getSubCategories();
        res.json(subcategories);
    }

    async createSubCategories(req, res){
        const { name, category_id } = req.body;

        const findSubCategories = await ProductService.getSubCategoriesByName(name);

        if(findSubCategories.length){
            return res.status(409).json({
                message: `SubCategories with name ${name} already exists`,
            });
        }

        const findCategories = await ProductService.getCategoriesById(category_id);

        if(findCategories.length === 0){
            return res.status(404).json({
                message: `Categories with id ${category_id} not found`,
            });
        }
        await ProductService.createSubCategories(name, category_id);
        res.status(201).json();
    }

    async updateSubCategories(req, res){
        const { id } = req.params;
        const { name, category_id } = req.body;

        const findSubCategories = await ProductService.getSubCategoriesById(id);

        if(findSubCategories.length === 0){
            return res.status(404).json({
                message: `SubCategories with id ${id} not found`,
            });
        }

        const findCategories = await ProductService.getCategoriesById(category_id);

        if(findCategories.length === 0){
            return res.status(404).json({
                message: `Categories with id ${category_id} not found. Please, enter correct category_id`,
            });
        }
        await ProductService.updateSubCategories(id, name, category_id);
        res.status(200).json();
    }

    async deleteSubCategories(req, res){
        const {id} = req.params;

        const findSubCategories = await ProductService.getSubCategoriesById(id);

        if(findSubCategories.length === 0){
            return res.status(404).json({
                message: `SubCategories with id ${id} not found`,
            });
        }
        await ProductService.deleteSubCategories(id);
        res.status(200).json({
            message: `SubCategories with id ${id} was deleted`,
        });
    }

    // THIS PART IS FOR PRODUCTS

    async getProducts(_, res){
        const products = await ProductService.getProducts();
        res.json(products);
    }

    async createProducts(req, res){
        const { name, price, subcategory_id } = req.body;
        await ProductService.createProducts(name, price, subcategory_id);
        res.status(201).json();
    }
     
    async updateProducts(req, res){
        const { id } = req.params;
        const { name, price, subcategory_id } = req.body;
        await ProductService.updateProducts(id, name, price, subcategory_id);
        res.status(200).json();
    }

    async deleteProducts(req, res){
        const {id} = req.params;
        await ProductService.deleteProducts(id);
        res.status(200).json({
            message: `Products with id ${id} was deleted`,
        });
    }

    // THIS PART IS FOR PAGINATION

    async getProductsPagination(req, res){
        const { page, limit } = req.query;
        const products = await ProductService.getProductsByPage(page, limit);
        res.json(products);
    }

    // THIS PART IS FOR SEARCH

    async searchProductsByName(req, res){
        const { search } = req.query;
        const products = await ProductService.searchProductsByName(search);
        res.json(products);
    }
}

export default new ProductController();