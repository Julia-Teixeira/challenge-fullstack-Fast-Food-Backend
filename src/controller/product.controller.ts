import { TProductService } from "../interface/product.interface";
import ProductService from "../services/product.service";
import { Request, Response } from "express";

const productService: TProductService = new ProductService();

class ProductController {
  async getAllProducts(request: Request, response: Response) {
    const products = await productService.findAll();
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