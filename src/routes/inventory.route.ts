import { Router } from 'express';
import {
  createInventory,
  updateInventory,
  salesReport,
  statistics,
} from '../controllers/inventory.controller';
import { authorizeRequest } from '../middlewares/authorization';
import {
  createInventoryJoiSchema,
  inventoryStatisticsJoiSchema,
  salesJoiSchema,
  updateInventoryJoiSchema,
  validationMiddleware,
} from '../middlewares/joiValidator';

const router = Router();

router.post(
  '/inventory',
  authorizeRequest,
  validationMiddleware(createInventoryJoiSchema),
  createInventory
);
router.put(
  '/inventory/:id',
  authorizeRequest,
  validationMiddleware(updateInventoryJoiSchema),
  updateInventory
);
router.get(
  '/inventory/sales',
  authorizeRequest,
  validationMiddleware(salesJoiSchema, 'query'),
  salesReport
);
router.get(
  '/inventory/statistics',
  authorizeRequest,
  validationMiddleware(inventoryStatisticsJoiSchema, 'query'),
  statistics
);

export { router as inventoryRouter };
