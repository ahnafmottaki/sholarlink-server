import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      req.originalUrl === "/api/v1/auth/register" &&
      file.mimetype !== "application/pdf"
    ) {
      cb(new Error("Invalid file type, please upload a PDF file."));
    } else if (req.originalUrl === "/api/v1/agent/" && req.method === "POST") {
      if (
        file.fieldname === "photo" &&
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png"
      ) {
        cb(new Error("Invalid file type, please upload a JPEG or PNG image."));
      } else if (
        file.fieldname !== "photo" &&
        file.mimetype !== "application/pdf"
      ) {
        cb(new Error("Invalid file type, please upload a PDF file."));
      }
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
});

export default upload;
