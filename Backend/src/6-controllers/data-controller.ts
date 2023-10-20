import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import { ProductModel } from "../3-models/product-model";
import StatusCode from "../3-models/status-code";

const router = express.Router();

// Get http://localhost:4000/api/categories
router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const categories = await dataService.getAllCategories();
       response.json(categories);
    }
    catch(err: any) {
        next(err);
    }
});

// Get http://localhost:4000/api/products-by-category/:categoryId
router.get("/products-by-category/:categoryId([a-fA-F0-9]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId;
        
        const products = await dataService.getProductsByCategory(categoryId);
        console.log(products);
       response.json(products);
    }
    catch(err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/products
router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await dataService.addProduct(product);
       response.status(StatusCode.Created).json(addedProduct);
    }
    catch(err: any) {
        next(err);
    }
});

// Delete http://localhost:4000/api/products
router.delete("/products/:_id([a-fA-F0-9]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await dataService.deleteProduct(_id);
       response.sendStatus(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});



export default router;
