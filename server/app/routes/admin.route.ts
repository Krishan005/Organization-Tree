import express from "express";

const router = express.Router();

// Middlewares
import { validateRequest } from "../middlewares";

// Request validation schemas
import { createEmployeeSchema } from "../schemas/employee.schema";

// Handlers
import { createEmployee } from "../controllers/employee.controller";

router.post("/employee", validateRequest(createEmployeeSchema), createEmployee);

export default router;
