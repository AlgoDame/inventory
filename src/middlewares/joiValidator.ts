import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';

export const userJoiSchema = Joi.object().keys({
  companyName: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const createInventoryJoiSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
  qtyAvailable: Joi.number().required(),
  qtySold: Joi.number().required(),
});

export const updateInventoryJoiSchema = Joi.object().keys({
  price: Joi.number(),
  qtyAvailable: Joi.number(),
  qtySold: Joi.number(),
});

export const salesJoiSchema = Joi.object().keys({
  year: Joi.string().required(),
});

export const inventoryStatisticsJoiSchema = Joi.object().keys({
  from: Joi.string().isoDate().required(),
  to: Joi.string().isoDate().required(),
});

export const validationMiddleware =
  (validationSchema: any, property?: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const payload = property ? req.query : req.body;
    const { error, value } = validationSchema.validate(payload);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
