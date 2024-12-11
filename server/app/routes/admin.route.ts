import express from "express";

const router = express.Router();

// Middlewares
import { validateRequest } from "../middlewares";

// Handlers
import { createEmployee } from "../controllers/employee.controller";

router.post("/employee", createEmployee);

export default router