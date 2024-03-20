import { TProductService } from "../interface/product.interface";
import ProductService from "../services/product.service";
import { Request, Response } from "express";

class ProductController {
  productService: TProductService = new ProductService();

  async getAllProducts(request: Request, response: Response) {
    const productService: TProductService = new ProductService();
    const products = await productService.findAll();
    return response.json(products).status(200);
  }
}

const productController = new ProductController();
export default productController;
