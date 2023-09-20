import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import {
  userJoiSchema,
  validationMiddleware,
} from '../middlewares/joiValidator';

const router = Router();

router.post('/users', validationMiddleware(userJoiSchema), createUser);

export { router as userRouter };
