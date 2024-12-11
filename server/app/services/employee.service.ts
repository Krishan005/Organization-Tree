import employeeModel, { EmployeeDocument } from "../models/employee.model";

export async function saveEmployeeDoc(doc: EmployeeDocument) {
  try {
    return await employeeModel.create(doc);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findAllEmployeeDocs() {
  try {
    return await employeeModel.find().lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findEmployeeById(id: EmployeeDocument["_id"]) {
  try {
    return await employeeModel.findById(id);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function collateEmployeeTree() {
  try {
    return await employeeModel.aggregate([
        {
          $addFields: {
            expanded: true,
            type: "person",
          },
        },
        // {
        //   $lookup: {
        //     from: "employees",
        //     localField: "_id",
        //     foreignField: "reporting",
        //     as: "children",
        //   },
        // },
        // {
        //   $addFields: {
        //     children: {
        //       expanded: true,
        //       type: "person",
        //     },
        //   },
        // },
        {
            $project: {
                __v: 0
            }
        }
      //   {
      //     $merge:
      //   },
      //   {
      //     $unwind: {
      //       path: "$children",
      //       // preserveNullAndEmptyArrays: true
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: {
      //         _id: "$_id",
      //         fullName: "$fullName",
      //         designation: "$designation",
      //         date_of_birth: "$date_of_birth",
      //         experience_years: "$experience_years",
      //         picture: "$picture",
      //         createdAt: "$createdAt",
      //         updatedAt: "$updatedAt",
      //         __v: "$__v",
      //         children: "$children"
      //       },
      //       // children: { $push: "$children" },
      //     },
      //   },
      //   {
      //     $addFields: {
      //       expanded: true,
      //       type: "person",
      //     },
      //   },
      ]);
    
    // .aggregate([
    //   {
    //     $match: { designation: "CEO" }, // Start from the root node (CEO)
    //   },
    //   {
    //     $graphLookup: {
    //       from: "employees", // The collection name
    //       startWith: "$_id", // Start with the CEO's `_id`
    //       connectFromField: "_id", // Match the current document's `_id`
    //       connectToField: "reporting", // Match the `reporting` field in the collection
    //       as: "allChildren", // Flattened list of all descendants
    //     },
    //   },
    //   {
    //     $addFields: {
    //       children: {
    //         $filter: {
    //           input: "$allChildren",
    //           as: "child",
    //           cond: { $eq: ["$$child.reporting", "$_id"] }, // Immediate children only
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       allChildren: 0, // Remove the flattened list
    //     },
    //   },
    //   {
    //     $set: {
    //       children: {
    //         $map: {
    //           input: "$children",
    //           as: "child",
    //           in: {
    //             $mergeObjects: [
    //               "$$child",
    //               {
    //                 children: {
    //                   $arrayElemAt: [
    //                     employeeModel.aggregate([
    //                       {
    //                         $match: {
    //                           reporting: "$$child._id",
    //                         },
    //                       },
    //                     ]),
    //                   ],
    //                 },
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     },
    //   },
    // ]);
  } catch (error: any) {
    throw new Error(error);
  }
}
