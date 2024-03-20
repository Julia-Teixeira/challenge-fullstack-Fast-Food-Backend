import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import AddData from "./database/data";
import resetarBancoDeDados from "./database/clearDatabase";

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

app.use("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(HandleErrors.execute);

export default app;
