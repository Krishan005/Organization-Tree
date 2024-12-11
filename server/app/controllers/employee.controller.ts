import { Request, Response } from "express";

// Services
import { saveEmployeeDoc } from "../services/employee.service";

export async function createEmployee(req: Request, res: Response) {
  try {
    const employee = await saveEmployeeDoc(req.body);

    return res.status(201).json({
      status: true,
      message: "Employee added sucessfully",
      data: employee,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({
        status: true,
        message: "Server error. Please try again.",
        error: error.message,
      });
  }
}
