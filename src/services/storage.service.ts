import { ReasonPhrases, StatusCodes } from "http-status-codes";
import bucket from "../config/gcs.config";
import { AppError } from "../lib/AppError";

class StorageService {
  private _registryFolder: string = "user-documents";

  get registryFolder() {
    return this._registryFolder;
  }
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
        reject(error);
      });

      bucketStream.on("finish", () => {
        resolve(fileName);
      });

      bucketStream.end(file.buffer);
    });
  }

  async getSignedUrl(fileName: string, expiresInMinutes = 15): Promise<string> {
    try {
      const file = bucket.file(fileName);
      const [url] = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + expiresInMinutes * 60 * 1000,
      });
      return url;
    } catch (err) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default new StorageService();
