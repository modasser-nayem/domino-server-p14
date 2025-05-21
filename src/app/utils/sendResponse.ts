import { Response } from "express";
import { TMetaData } from "../types/pagination";

type TSendResponseData = {
  statusCode: number;
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: TMetaData;
};

const sendResponse = (res: Response, data: TSendResponseData) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data?.meta,
  });
};

export default sendResponse;
