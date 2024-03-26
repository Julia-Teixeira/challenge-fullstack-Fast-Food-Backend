import express from "express";
import additionalController from "../controller/additionals.controller";

const additionalRouter = express.Router();

additionalRouter.get("", additionalController.getAll);
additionalRouter.post("", additionalController.create);

export default additionalRouter;
