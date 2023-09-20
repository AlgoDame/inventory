import { Request, Response, NextFunction } from 'express';
import { IUser, UserModel } from '../models/user.model';

export interface CustomRequest extends Request {
  user?: IUser
}

export const authorizeRequest = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.headers.apikey) {
    return res.status(401).json({ error: 'Missing API Key' });
  }
  const user = await UserModel.findOne({ apiKey: req.headers.apikey });
  if (!user) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }
  req.user = user;
  next();
};
