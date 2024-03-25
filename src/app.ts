import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import productRouter from "./routes/product.router";
import productOrderRouter from "./routes/productOrder.router";
import orderRouter from "./routes/order.router";
import HandleErrors from "./middleware/handleError.middleware";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import categoriesRouter from "./routes/categories.router";
import additionalRouter from "./routes/additional.router";

const app = express();

app.use(json());
app.use(cors());
app.use(helmet());

const file = fs.readFileSync("../swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/products", productRouter);
app.use("/additionals", additionalRouter);
app.use("/productOrders", productOrderRouter);
app.use("/orders", orderRouter);
app.use("/categories", categoriesRouter);

app.use(HandleErrors.execute);

export default app;
