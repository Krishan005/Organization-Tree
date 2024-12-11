import { Request, Response } from "express";

export async function createEmployee(req: Request, res: Response) {
  res.status(201).json({ status: true, message: "Employee added sucessfully" });
}
