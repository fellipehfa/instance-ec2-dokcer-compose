import { Request, Response, Router } from 'express';

// import { AuthRouter } from './routes/AuthRouter';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  return response.json({
    message: `Serverless Challenge`,
  });
});

// router.use('/auth', AuthRouter);

export { router };
