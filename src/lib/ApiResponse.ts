import { Response } from "express";

class ApiResponse {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: any,
  ) {}
  sendResponse(res: Response) {
    res.status(this.statusCode).json({
      success: true,
      message: this.message,
      ...(this.data && { data: this.data }),
    });
  }
}

export { ApiResponse };
