import { Router } from 'express';
import { userRouter } from './user.route';
import { inventoryRouter } from './inventory.route';

const router = Router();
router.use(userRouter)
router.use(inventoryRouter);


export default router;
