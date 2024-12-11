import { Request, Response } from "express";
import fs from "fs";

const uploadImage = async (req: Request, res: Response) => {
  if (req.file) {
    var filetype: string = "";
    // Check for mimetype
    // if (
    //   req.file.mimetype ==
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // ) {
    //   filetype = "docx";
    // }
    // if (req.file.mimetype == "application/pdf") {
    //   filetype = "pdf";
    // }
    if (req.file.mimetype == "image/jpg") {
      filetype = "jpg";
    } else if (req.file.mimetype == "image/jpeg") {
      filetype = "jpeg";
    } else if (req.file.mimetype == "image/png") {
      filetype = "png";
    } else {
      return res.status(400).json({
        status: false,
        message: "Failed to upload image.",
        error: {
          msg: "Please check the file type. Only .jpg, .jpeg,.png allowed",
          param: "file",
          location: "images",
        },
      });
    }

    var serverDirectory = "/1/server"
    var upload_endpoint = "/storages/uploads/images/"

    var file_name =
      Math.floor(100000 + Math.random() * 900000) +
      "." +
      filetype;

    fs.writeFileSync("../.."+serverDirectory+upload_endpoint+file_name, req.file.buffer);

    return file_name;
  } else {
    return res.status(400).json({
      status: false,
      error: "No image provided.",
    });
  }
};

export { uploadImage };
