import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import AddData from "./database/data";
import resetarBancoDeDados from "./database/clearDatabase";
import productRouter from "./routes/product.router";
import productOrderRouter from "./routes/productOrder.router";
import orderRouter from "./routes/order.router";
import HandleErrors from "./middleware/handleError.middleware";

const app = express();

app.use(json());
app.use(cors());
app.use(helmet());

app.use("/data", async (req, res) => {
  await AddData();
  res.send("Dados cadastrados com sucesso!");
});

app.use("/clearDatabase", async (req, res) => {
  await resetarBancoDeDados();
  res.send("Dados limpos com sucesso!");
});

app.use("/products", productRouter);
app.use("/productOrders", productOrderRouter);
app.use("/orders", orderRouter);

app.use(HandleErrors.execute);

export default app;
