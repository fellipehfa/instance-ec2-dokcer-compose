import { Request, Response, Router } from 'express';

// import { AuthRouter } from './routes/AuthRouter';
import { UserRouter } from './routers/userRoutes';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  return response.json({
    message: `Serverless Challenge`
  });
});

// router.use('/auth', AuthRouter);
router.use('/users', UserRouter);

export { router };
