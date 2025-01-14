import express from "express";

const router = express.Router();

// Middlewares
import { validateRequest } from "../middlewares";

// Request validation schemas
import {
  createEmployeeSchema,
  editEmployeeSchema,
} from "../schemas/employee.schema";

// Handlers
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmployeeTree,
  editEmployee,
} from "../controllers/employee.controller";

router.post("/employee", validateRequest(createEmployeeSchema), createEmployee);
router.get("/employee", getAllEmployees);
router.get("/employee/:id", getEmployeeById);
router.get("/organization-tree", getEmployeeTree);
router.put(
  "/employee/:id",
  validateRequest(editEmployeeSchema),
  editEmployee
);
export default router;
