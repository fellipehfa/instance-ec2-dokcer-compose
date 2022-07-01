import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { AppError } from './error/AppError';
import { router } from './routes';

const app = express();

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      console.log(
        '>',
        err.log,
        'status code:',
        err.statusCode,
        'message:',
        err.message
      );
      return response.status(err.statusCode).json({ message: err.message });
    }

    console.log('>', err.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
);

export default app;
