import { NextFunction, Request, Response } from 'express';

interface IError extends Error {
  status: number;
  message: string;
}

export default function errorHandle(
  error: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  if (error.message) {
    return res.status(Number(error.status)).json({ message: error.message });
  }

  return res.status(Number(error.status) || 500).json(error.message);
}
