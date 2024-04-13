import ProductService from "../services/product.service";
import { Request, Response } from "express";

const productService = new ProductService();

class ProductController {
  async createProduct(request: Request, response: Response) {
    const product = await productService.createProduct(request.body);
    return response.json(product).status(201);
  }
  async getAllProducts(request: Request, response: Response) {
    const products = await productService.findAll(
      request.query.category as string,
      {
        page: Number(request.query.page) || 1,
        perPage: Number(request.query.perPage) || 20,
      },
    );
    return response.json(products).status(200);
  }

  async getProductById(request: Request, response: Response) {
    const { id } = request.params;
    const product = await productService.findProductById(Number(id));
    return response.json(product).status(200);
  }
}

const productController = new ProductController();
export default productController;
