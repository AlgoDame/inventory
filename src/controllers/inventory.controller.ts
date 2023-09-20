import { Request, Response } from 'express';
import { InventoryModel } from '../models/inventory.model';
import { CustomRequest } from '../middlewares/authorization';
import moment from 'moment';

export const createInventory = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const productExists = await InventoryModel.findOne({ name: req.body.name });
  if (productExists) {
    return res.status(409).json({ error: 'Product already exists' });
  }
  body.userId = req.user?._id;
  const product = await InventoryModel.create(body);
  res.json({ success: true, data: product });
};

export const updateInventory = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const productExists = await InventoryModel.findOne({ _id: req.params.id });
  if (!productExists) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const product = await InventoryModel.findOneAndUpdate(
    { _id: req.params.id },
    body,
    { new: true }
  );
  res.json({ success: true, data: product });
};

export const salesReport = async (req: CustomRequest, res: Response) => {
  const yearParam = req.query.year as string;
  if (!yearParam) {
    return res.status(400).json({ error: 'Year is required' });
  }

  const yearMoment = moment(yearParam, 'YYYY');

  if (!yearMoment.isValid()) {
    return res.status(400).json({ error: 'Invalid year format' });
  }

  const startOfYear = yearMoment.startOf('year').toDate();
  const endOfYear = yearMoment.endOf('year').toDate();
  const sales = await InventoryModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfYear,
          $lt: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: '$name',
        sales: { $sum: '$qtySold' },
      },
    },
  ]);
  res.json({ success: true, data: sales });
};

export const statistics = async (req: CustomRequest, res: Response) => {
  const fromDate = req.query.from as string;
  const toDate = req.query.to as string;

  const fromDateMoment = moment(fromDate, 'YYYY-MM-DD');
  const toDateMoment = moment(toDate, 'YYYY-MM-DD');

  const startOfPeriod = fromDateMoment.startOf('day').toDate();
  const endOfPeriod = toDateMoment.endOf('day').toDate();

  let statisticsReport: any = {};

  const averageSales = await InventoryModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfPeriod,
          $lte: endOfPeriod,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$qtySold' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        averageSales: { $divide: ['$totalSales', '$count'] },
      },
    },
  ]);

  const availableProductValue = await InventoryModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfPeriod,
          $lte: endOfPeriod,
        },
      },
    },
    {
      $project: {
        value: { $multiply: ['$qtyAvailable', '$price'] },
      },
    },
    {
      $group: {
        _id: null,
        totalValue: { $sum: '$value' },
      },
    },
    {
      $project: {
        _id: 0,
        totalValue: 1,
      },
    },
  ]);

  statisticsReport.averageSales = averageSales.length
    ? averageSales[0].averageSales
    : 0;
  statisticsReport.availableProductValue = availableProductValue.length
    ? availableProductValue[0].totalValue
    : 0;

  return res.json({ success: true, data: statisticsReport });
};
