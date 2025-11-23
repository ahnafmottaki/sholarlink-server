import bucket from "../config/gcs.config";

class StorageService {
  uploadFile(file: Express.Multer.File, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const bucketFile = bucket.file(fileName);
      const bucketStream = bucketFile.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });
      bucketStream.on("error", (error) => {
        reject(new Error("Server error, please try again later."));
      });

      bucketStream.on("finish", () => {
        resolve(fileName);
      });

      bucketStream.end(file.buffer);
    });
  }
}

export default new StorageService();
