import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import { EmployeeDocument } from "../models/employee.model";

// Services
import {
  saveEmployeeDoc,
  findAllEmployeeDocs,
  findEmployeeById,
} from "../services/employee.service";

export async function createEmployee(req: Request, res: Response) {
  try {
    if (
      req.body.designation.toUpperCase() !== "CEO" ||
      req.body.designation.toLowerCase() !== "chief executive officer"
    ) {
      if (!req.body.reporting) {
        return res.status(400).json({
          status: false,
          message: "Reporting person is required",
          error: "'reporting' key is missing",
        });
      }

      if (!mongoose.isValidObjectId(req.body.reporting)) {
        return res.status(400).json({
          status: false,
          message: "Invalid reporting id",
        });
      }
    }

    const employee = await saveEmployeeDoc(req.body);

    return res.status(201).json({
      status: true,
      message: "Employee added sucessfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again.",
      error,
    });
  }
}

export async function getAllEmployees(req: Request, res: Response) {
  try {
    let employees = await findAllEmployeeDocs();

    return res.status(200).json({
      status: true,
      message: "Employees get successfully.",
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again.",
      error,
    });
  }
}

export async function getEmployeeById(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid id in params",
      });
    }

    let employee = await findEmployeeById(id);

    if (employee) {
      res.status(200).json({
        status: true,
        message: "Employee get successfully.",
        data: employee,
      });
    } else {
      res.status(200).json({ status: true, message: "Employee not found." });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again.",
      error,
    });
  }
}

export async function getEmployeeTree(req: Request, res: Response) {
  try {
    let employees = await findAllEmployeeDocs();
    console.log(employees);

    let tree = buildHierarchy(JSON.parse(JSON.stringify(employees)));

    return res.status(200).json({
      status: true,
      message: "Organization tree get successfully.",
      data: tree,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}

type Employee = {
  _id: string;
  fullName: string;
  designation: string;
  date_of_birth: string;
  experience_years: number;
  picture: string;
  reporting?: string;
  expanded?: boolean;
  type?: string;
  children?: Employee[];
};

function buildHierarchy(
  employees: Employee[],
  parentId: string | undefined = undefined
): Employee[] {
  return employees
    .filter((employee) => employee.reporting == parentId)
    .map((employee) => ({
      ...employee,
      expanded: true,
      type: "person",
      children: buildHierarchy(employees, employee._id), // Recursively build children
    }));
}
