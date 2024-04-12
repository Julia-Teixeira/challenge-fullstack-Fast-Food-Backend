import express from "express";
import additionalController from "../controller/additionals.controller";
import ensureMiddleware from "../middleware/ensure.middleware";
import { createAdditionalSchema } from "../schema/additionals.schema";

const additionalRouter = express.Router();

additionalRouter.get("", additionalController.getAll);
additionalRouter.post(
  "",
  ensureMiddleware.validBody(createAdditionalSchema),
  additionalController.create,
);

export default additionalRouter;
