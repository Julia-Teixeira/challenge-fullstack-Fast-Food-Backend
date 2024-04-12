import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, _: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };
}

const ensureMiddleware = new EnsureMiddleware();
export default ensureMiddleware;
