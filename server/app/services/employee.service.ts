import employeeModel, { EmployeeDocument } from "../models/employee.model";

export async function saveEmployeeDoc(doc: EmployeeDocument) {
  try {
    return await employeeModel.create(doc);
  } catch (error: any) {
    throw new Error(error);
  }
}
